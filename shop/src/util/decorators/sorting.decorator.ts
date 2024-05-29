import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface Sorting {
    property: string;
    direction: string;
}

export const SortingParams = createParamDecorator((validParams, ctx: ExecutionContext): Sorting => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) {
        return null;
    }
    
    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
    if (typeof validParams != 'object' || !sort.match(sortPattern)) {
        throw new BadRequestException('Invalid sort parameter');
    }
    
    const [property, direction] = sort.split(':');
    if (!validParams.includes(property)) {
        throw new BadRequestException(`Invalid sort property: ${property}`);
    } 

    return { property, direction };
});