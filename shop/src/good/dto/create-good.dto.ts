import { Currency } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class CreateGoodDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsInt()
    price: number;

    @IsNotEmpty()
    discount: string;

    @IsNotEmpty()
    @IsEnum(Currency)
    currency: Currency;

    @IsNotEmpty()
    shopId: string;
}
