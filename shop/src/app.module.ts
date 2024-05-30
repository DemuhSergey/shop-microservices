import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { GoodModule } from './good/good.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ShopModule, GoodModule, UserModule],
  providers: [AppService],
})
export class AppModule {}
