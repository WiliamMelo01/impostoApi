import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    default: 'João',
  })
  nome: string;

  @IsEmail()
  @ApiProperty({
    default: 'joao@gmail.com',
  })
  email: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @ApiProperty({
    default: 1000,  
  })
  renda_mensal: number;
}
