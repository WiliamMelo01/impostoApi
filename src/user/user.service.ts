import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDTO } from './dtos/update_user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(PrismaService) private readonly _prismaService: PrismaService,
  ) {}

  async create({ email, renda_mensal, nome }: CreateUserDto) {
    try {
      const aliquota = this.calcularAliquota(renda_mensal);

      const taxa_mensal = renda_mensal * (aliquota / 100);

      const user = await this._prismaService.user.create({
        data: {
          email,
          renda_mensal,
          nome,
          aliquota,
          taxa_mensal,
        },
      });

      const formattedData = this.getFormattedValues(user);

      return {
        ...user,
        ...formattedData,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao criar o usuário.',
        error.message,
      );
    }
  }

  private calcularAliquota(renda_mensal: number) {
    if (renda_mensal <= 2_112.0) {
      return 0.0;
    } else if (renda_mensal <= 2_826.65) {
      return 7.5;
    } else if (renda_mensal <= 3_751.05) {
      return 15;
    } else if (renda_mensal <= 4_664.68) {
      return 22.5;
    } else {
      return 27.5;
    }
  }

  async getAll() {
    try {
      const users = await this._prismaService.user.findMany();
      return users.map((user) => {
        const formattedData = this.getFormattedValues(user);
        return { ...user, ...formattedData };
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscar os usuários.',
        error.message,
      );
    }
  }

  async getById(id: string) {
    try {
      const user = await this._prismaService.user.findFirstOrThrow({
        where: {
          id,
        },
      });
      const formattedData = this.getFormattedValues(user);
      return { ...user, ...formattedData };
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async deleteUser(id: string) {
    try {
      await this._prismaService.user.delete({
        where: {
          id,
        },
      });
      return { message: 'Usuário deletado com sucesso.', statusCode: 200 };
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao deletar o usuário.',
        error.message,
      );
    }
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await this._prismaService.user.findFirst({
      where: {
        id,
      },
    });

    let aliquota = user.aliquota;
    let taxaMensal = user.taxa_mensal;

    if (data.renda_mensal) {
      aliquota = this.calcularAliquota(data.renda_mensal);
      taxaMensal = data.renda_mensal * (aliquota / 100);
    }

    try {
      return await this._prismaService.user.update({
        where: {
          id,
        },
        data: {
          ...data,
          taxa_mensal: taxaMensal,
          aliquota,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar um usuário.',
        error.message,
      );
    }
  }

  getFormattedValues(user: {
    id: string;
    nome: string;
    email: string;
    renda_mensal: number;
    aliquota: number;
    taxa_mensal: number;
  }) {
    const aliquotaFormatada = user.aliquota.toString().concat('%');
    const rendaMensalFormatada = user.renda_mensal.toLocaleString('BR', {
      currency: 'BRL',
      style: 'currency',
    });
    const taxaMensalFormatada = user.taxa_mensal.toLocaleString('BR', {
      currency: 'BRL',
      style: 'currency',
    });
    return {
      aliquota: aliquotaFormatada,
      renda_mensal: rendaMensalFormatada,
      taxa_mensal: taxaMensalFormatada,
    };
  }
}
