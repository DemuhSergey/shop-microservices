import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ShopModule } from './module/shop/shop.module';

@Module({
  imports: [ShopModule],
  exports: [ShopModule],
  providers: [AppService],
})
export class AppModule {}
