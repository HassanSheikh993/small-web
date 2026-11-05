import { IsString,Matches } from "class-validator";

export class AddressParamDto{
    @IsString()
  @Matches(/^[a-z0-9-]+\.[a-z]+$/i, { message: 'Invalid address, e.g. tidepool.zz' })
  address: string

}