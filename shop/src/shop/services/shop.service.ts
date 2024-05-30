import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getPagination, getOrder, getWhere } from 'src/util/helpers/table.helper';
import { ITableParamsDto } from 'src/util/dto/table-params.dto';
import { UpdateShopDto } from '../dto/update-shop.dto';
import { CreateShopDto } from '../dto/create-shop.dto';

@Injectable()
export class ShopService {

  constructor(private prismaService: PrismaService) { }

  async create(dto: CreateShopDto) {
    return this.prismaService.shop.create({
      data: {
        ...dto
      }
    }).then(x => x.id);
  }

  async findAll(params: ITableParamsDto) {

    return this.prismaService.shop.findMany({
      ...getPagination(params.pagination),
      ...getOrder(params.sort),
      include: {
        goods: true
      },
      where: {
        ...getWhere(params.filter)
      }
    })
  }

  async update(id: string, dto: UpdateShopDto) {
    return this.prismaService.shop.update({
      data: {
        ...dto,
        updatedAt: new Date()
      },
      where: { id }
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
