import { IsIn, IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateVisitDto {
  @IsMongoId()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  address: string;

  @IsIn(['typed', 'link', 'back', 'forward', 'history', 'search'])
  how: string;
}