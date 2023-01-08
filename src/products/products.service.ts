import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Discount } from './entities/discount.entity'
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { HttpException } from '../classes'
import { Category } from '../categories/entities/category.entity';
import { v4 as uuidv4 } from 'uuid';
import { FindProductsQueryParamsDto } from './dto/find-products-query-params.dto';
import * as moment from 'moment';

@Injectable()
export class ProductsService {
  private notFoundMessage = 'Product Not Found'

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Discount) private discountRepository: Repository<Discount>
  ) {}
  
  async create(createProductDto: CreateProductDto) {
    // save discount
    let savedDiscount: Discount = undefined
    let category = new Category()
    category.categoryId = createProductDto.categoryId

    if(createProductDto.discount) {
      const discount = { 
        ...createProductDto.discount, 
        expiredAt: new Date(createProductDto.discount.expiredAt * 1000) 
      }
      const newDiscount = this.discountRepository.create(discount);
      savedDiscount = await this.discountRepository.save(newDiscount)
    }

    // create product
    const product = {
      ...createProductDto,
      discount: savedDiscount,
      category: category
    }

    const newProduct = this.productRepository.create(product);
    
    // assign temporary sku
    newProduct.sku = uuidv4()

    // save product
    const savedProduct = await this.productRepository.save(newProduct);
    // update sku
    const updatedProduct = await this.productRepository.save({ ...newProduct, sku: `ID00${savedProduct.productId}` });
    
    const payload = {
      ...updatedProduct,
      categoriesId: savedProduct.category.categoryId
    }

    delete payload.discount
    delete payload.category

    return payload
  }

  async find(query: FindProductsQueryParamsDto) {
    const { skip, limit } = query;
    const where: FindOptionsWhere<Product> = {}
    const searchTerm = query.q?.trim()

    if(query.categoryId)
      where.categoryCategoryId = query.categoryId

    if(searchTerm?.length > 0) {
      where.name = Like(`%${searchTerm}%`)
    }

    const [products, total] = await this.productRepository.findAndCount({
      skip,
      take: limit,
      relations: {
        category: true,
        discount: true
      },
      where
    });

    return {
      products: products.map(product => {
        if(product.discount) {
          product.discount = this.formatDiscount(product.discount, product.price)
        }
        return product
      }),
      meta: {
        total,
        skip,
        limit
      }
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      relations: {
        category: true,
        discount: true
      },
      where: {
        productId: id
      }
    });

    if(!product)
      throw new HttpException({ message: this.notFoundMessage }, 404);

    if(product.discount) {
      product.discount = this.formatDiscount(product.discount, product.price);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let category = new Category()
    category.categoryId = updateProductDto.categoryId
    delete updateProductDto.categoryId
    
    const result = await this.productRepository.update(id, { ...updateProductDto, category });

    if(result.affected === 0) {
      throw new HttpException({ message: this.notFoundMessage }, 404);
    }
  }

  async remove(id: number) {
    const result = await this.productRepository.delete(id);
    
    if(result.affected === 0) {
      throw new HttpException({ message: this.notFoundMessage }, 404);
    }
  }

  private format_BUY_N(qty: number, result: number): string {
    if(qty === 1) {
      return `Only ${this.formatCurrency(result)}`
    }

    return `Buy ${qty} only ${this.formatCurrency(result)}`
  }

  private formatCurrency(price: number) {
    return new Intl.NumberFormat(
      'id-ID', 
      { 
        style: 'currency', 
        currency: 'IDR'
      }
    )
    .format(price).replace('IDR', 'Rp.')
    .replace('.00', '')
    .replace(/,/g, '.')
  }

  private format_PERCENT(qty: number, result: number, price): string {
    const afterDiscount = price - (result / 1000 * price)
    if(qty === 1) {
      return `Discount ${result}% ${this.formatCurrency(afterDiscount)}`
    }

    return `Buy ${qty} discount ${result}% ${this.formatCurrency(afterDiscount)} each`
  }

  private formatDiscount(discount: Discount, price: number) {
    const { qty, result } = discount
    const clone = {
      ...discount,
      stringFormat: discount.type === 'BUY_N' ? this.format_BUY_N(qty, result) : this.format_PERCENT(qty, result, price),
      expiredAtFormat: moment(new Date(discount.expiredAt)).format('DD MMM YYYY')
    }
    return clone
  }
}
