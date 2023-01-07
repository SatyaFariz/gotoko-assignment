import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoriesQueryParamsDto } from './dto/find-categories-query-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  create(createCategoryDto: CreateCategoryDto) {
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

  findOne(id: number) {
    return this.categoryRepository.findOneById(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    return this.categoryRepository.save({ categoryId: category.categoryId, ...updateCategoryDto });
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
