import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [ShopModule],
  providers: [AppService],
})
export class AppModule {}
