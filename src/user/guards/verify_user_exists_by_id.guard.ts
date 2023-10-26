import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VerifyUserExistsByIdGuard implements CanActivate {
  constructor(
    @Inject(PrismaService) private readonly _prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    const { id } = req.params as { id: string };

    const user = await this._prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (user) {
      return true;
    }

    throw new NotFoundException('Este usuário nao exite.');
  }
}
