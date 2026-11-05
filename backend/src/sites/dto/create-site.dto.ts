import { IsMongoId, IsNotEmpty, IsString,Matches,MaxLength } from "class-validator";

export class CreateSiteDto{
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9-]+\.[a-z]+$/i, { message: 'Invalid address, e.g. tidepool.zz' })
    address: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    title: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(100_000)
    html:string

    @IsMongoId()
    userId: string
    



}