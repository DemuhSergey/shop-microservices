import { IsNotEmpty } from "class-validator";

export class CreateShopDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description: string;
}
