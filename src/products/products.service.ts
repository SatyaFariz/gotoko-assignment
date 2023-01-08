import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Discount } from './entities/discount.entity'
import { Repository } from 'typeorm';
import { HttpException } from '../classes'
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
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

    const product = {
      ...createProductDto,
      discount: savedDiscount,
      category: category
    }

    const newProduct = this.productRepository.create(product);
    const savedProduct = await this.productRepository.save(newProduct);
    
    const payload = {
      ...savedProduct,
      categoriesId: savedProduct.category.categoryId
    }

    delete payload.discount
    delete payload.category

    return payload
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
