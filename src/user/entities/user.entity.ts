import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  renda_mensal: number;
  @ApiProperty()
  aliquota: number;
  @ApiProperty()
  taxa_mensal: number;
  @ApiProperty()
  id: string;
}
