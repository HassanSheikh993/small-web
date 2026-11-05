import { Type } from "class-transformer";
import { IsInt, IsMongoId, IsOptional, Min } from "class-validator";

export class HistoryQueryDto {

    @IsMongoId()
    userId: string;

    @IsOptional()
    @Type(()=> Number)  // Converts text to a number
    @IsInt()  // Checks it’s a whole number
    @Min(0)
    page: number = 0 // default to the first page

}