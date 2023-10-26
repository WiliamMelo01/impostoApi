import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from '../dtos/create_user.dto';

@Injectable()
export class VerifyUserIsNotAlreadyRegisteredGuard implements CanActivate {
  constructor(
    @Inject(PrismaService) private readonly _prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    const { email } = req.body as CreateUserDto;

    const user = await this._prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return true;
    }

    throw new ConflictException('Este email já este em uso.');
  }
}
