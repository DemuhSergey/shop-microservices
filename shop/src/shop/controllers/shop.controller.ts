import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ShopService } from '../services/shop.service';
import { CreateShopDto } from '../dto/create-shop.dto';
import { UpdateShopDto } from '../dto/update-shop.dto';
import { FilteringParams, Filtering } from 'src/util/decorators/filtering.decorator';
import { PaginationParams, Pagination } from 'src/util/decorators/pagination.decorator';
import { SortingParams, Sorting } from 'src/util/decorators/sorting.decorator';
import { Shop } from '@prisma/client';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createShopDto: Omit<Shop, 'goods'|'users'|'id'>) {
    return this.shopService.create(createShopDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'id', 'stateId']) sort?: Sorting,
    @FilteringParams(['name', 'id', 'stateId']) filter?: Filtering
  ) {
    return this.shopService.findAll(paginationParams, sort, filter);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() dto: Omit<Shop, 'goods'|'users'>) {
    return this.shopService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.shopService.remove(id);
  }
}
