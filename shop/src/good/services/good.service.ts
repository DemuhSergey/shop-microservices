import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from '../dto/create-good.dto';
import { UpdateGoodDto } from '../dto/update-good.dto';
import { ITableParamsDto } from 'src/util/dto/table-params.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPagination, getOrder, getWhere } from 'src/util/helpers/table.helper';

@Injectable()
export class GoodService {

  constructor(private prismaService: PrismaService) { }

  create(dto: CreateGoodDto) {
    return this.prismaService.good.create({
      data: {
        ...dto
      }
    }).then(x => x.id);
  }

  async findAll(shopId: string, params: ITableParamsDto) {
    return this.prismaService.good.findMany({
      ...getPagination(params.pagination),
      ...getOrder(params.sort),
      where: {
        ...getWhere(params.filter),
        shopId
      }
    })
  }

  async findOne(id: string) {
    return this.prismaService.good.findFirst({
      where: {
        id
      },
      include: {
        shop: true
      }
    }).then(x => x);
  }

  async update(id: string, dto: UpdateGoodDto) {
    return this.prismaService.good.update({
      data: {
        ...dto,
        updatedAt: new Date()
      },
      include: {
        shop: true
      },
      where: { id }
    }).then(x => x.id);
  }

  async remove(id: string) {
    return this.prismaService.good.delete({
      where: {
        id
      }
    }).then(x => x.id);
  }
}
