import { Module } from '@nestjs/common';
import { ShopService } from './services/shop.service';
import { ShopController } from './controllers/shop.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
