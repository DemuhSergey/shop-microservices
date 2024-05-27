import { Module } from '@nestjs/common';
import { ShopService } from './service/shop.service';
import { ShopController } from './shop.controller';
import { GoodService } from './service/good.service';
import { UserService } from './service/user.service';

@Module({
  providers: [ShopService, GoodService, UserService],
  controllers: [ShopController]
})
export class ShopModule {}
