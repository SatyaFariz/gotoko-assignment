import { Module } from '@nestjs/common';
import { SoldsService } from './solds.service';
import { SoldsController } from './solds.controller';

@Module({
  controllers: [SoldsController],
  providers: [SoldsService]
})
export class SoldsModule {}
