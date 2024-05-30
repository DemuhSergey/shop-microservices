import { Module } from '@nestjs/common';
import { GoodService } from './services/good.service';
import { GoodController } from './controllers/good.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GoodController],
  providers: [GoodService],
})
export class GoodModule { }
