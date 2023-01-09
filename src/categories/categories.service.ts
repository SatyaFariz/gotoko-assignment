import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoriesQueryParamsDto } from './dto/find-categories-query-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { HttpException } from '../classes'
import generateCreateEmptyBodyErrorObject from '../helpers/generateCreateEmptyBodyErrorObject'
import generateUpdateEmptyBodyErrorObject from '../helpers/generateUpdateEmptyBodyErrorObject'

@Injectable()
export class CategoriesService {
  private notFoundMessage: string = 'Category Not Found';

  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  create(createCategoryDto: CreateCategoryDto) {
    if(Object.keys(createCategoryDto).length === 0) {
      const error = generateCreateEmptyBodyErrorObject(['name'])
      throw new HttpException(error, 400)
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  async find(query: FindCategoriesQueryParamsDto) {
    const { skip, limit } = query;
    const [categories, total] = await this.categoryRepository.findAndCount({
      skip,
      take: limit
    });

    return {
      categories,
      meta: {
        total,
        skip,
        limit
      }
    };
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneById(id);

    if(!category)
      throw new HttpException({ message: this.notFoundMessage }, 404);
      
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    if(Object.keys(updateCategoryDto).length === 0) {
      const error = generateUpdateEmptyBodyErrorObject(['name'])
      throw new HttpException(error, 400)
    }

    const result = await this.categoryRepository.update(id, updateCategoryDto);
    if(result.affected === 0) {
      throw new HttpException({ message: this.notFoundMessage }, 404);
    }
  }

  async remove(id: number) {
    const result = await this.categoryRepository.delete(id);
    if(result.affected === 0) {
      throw new HttpException({ message: this.notFoundMessage }, 404);
    }
  }
}
