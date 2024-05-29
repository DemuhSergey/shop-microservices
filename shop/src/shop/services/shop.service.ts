import { Injectable } from '@nestjs/common';
import { CreateShopDto } from '../dto/create-shop.dto';
import { UpdateShopDto } from '../dto/update-shop.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Filtering } from 'src/util/decorators/filtering.decorator';
import { Pagination } from 'src/util/decorators/pagination.decorator';
import { Sorting } from 'src/util/decorators/sorting.decorator';
import { getPagination, getOrder, getWhere } from 'src/util/helpers/table.helper';
import { Shop } from '@prisma/client';

@Injectable()
export class ShopService {

  constructor(private prismaService: PrismaService) {

  }

  create(dto: Omit<Shop, 'goods' | 'users' | 'id'>) {
    return this.prismaService.shop.create({
      data: {
        ...dto
      }
    }).then(x => x.id);
  }

  findAll(
    pagination: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ) {

    return this.prismaService.shop.findMany({
      ...getPagination(pagination),
      ...getOrder(sort),
      include: {
        goods: true
      },
      where: {
        ...getWhere(filter)
      }
    })
  }

  update(id: string, dto: Omit<Shop, 'goods' | 'users'>) {
    return this.prismaService.shop.update({
      data: {
        ...dto
      },
      where: { id: dto.id }
    }).then(x => x.id);
  }

  async findOne(id: string) {
    return this.prismaService.shop.findFirst({
      where: {
        id
      },
      include: {
        goods: true
      }
    }).then(x => x);
  }

  async remove(id: string) {
    return this.prismaService.shop.delete({
      where: {
        id
      },
      include: {
        goods: true
      }
    }).then(x => x.id);
  }
}
