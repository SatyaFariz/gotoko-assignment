import { Controller, Get } from '@nestjs/common';
import { SoldsService } from './solds.service';

@Controller('solds')
export class SoldsController {
  constructor(private readonly soldsService: SoldsService) {}

  @Get()
  findAll() {
    return this.soldsService.findAll();
  }
}
