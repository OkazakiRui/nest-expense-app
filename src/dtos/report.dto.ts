import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  source: string;

  @IsString()
  @IsNotEmpty()
  amount: number;
}
