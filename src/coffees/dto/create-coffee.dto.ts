import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCoffeeDto {
  // @IsNumber()
  id: number;
  @IsString()
  readonly name: string;
  @IsString()
  readonly brand: string;
  @IsString({ each: true })
  @IsOptional()
  readonly flavors: string[];
}
