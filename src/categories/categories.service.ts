import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryQueryParamsDto } from './dto/find-category-query-params.dto';
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

  find(query: FindCategoryQueryParamsDto) {
    return this.categoryRepository.find({
      skip: query.skip,
      take: query.limit
    });
  }

  findOne(id: number) {
    return this.categoryRepository.findOneById(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    return this.categoryRepository.save({ id: category.id, ...updateCategoryDto });
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
