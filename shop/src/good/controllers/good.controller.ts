import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { GoodService } from '../services/good.service';
import { CreateGoodDto } from '../dto/create-good.dto';
import { UpdateGoodDto } from '../dto/update-good.dto';
import { FilteringParams, Filtering } from 'src/util/decorators/filtering.decorator';
import { PaginationParams, Pagination } from 'src/util/decorators/pagination.decorator';
import { SortingParams, Sorting } from 'src/util/decorators/sorting.decorator';

@Controller('good')
export class GoodController {
  constructor(private readonly goodService: GoodService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGoodDto: CreateGoodDto) {
    return this.goodService.create(createGoodDto);
  }

  @Get(':shopId')
  findAll(
    @Param('shopId') shopId: string,
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['id', 'description', 'title']) sort?: Sorting,
    @FilteringParams(['id', 'description', 'title']) filter?: Filtering
  ) {
    return this.goodService.findAll(
      shopId, {
      pagination: paginationParams,
      sort,
      filter
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.goodService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodDto) {
    return this.goodService.update(id, updateGoodDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.goodService.remove(id);
  }
}
