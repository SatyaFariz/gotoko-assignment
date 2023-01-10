import { Controller, Get, UseGuards } from '@nestjs/common';
import { SoldsService } from './solds.service';
import AuthGuard from '../guards/auth-guard';

@Controller('solds')
export class SoldsController {
  constructor(private readonly soldsService: SoldsService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.soldsService.findAll();
  }
}
