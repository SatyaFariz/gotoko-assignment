import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  find() {
    return this.categoriesService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
