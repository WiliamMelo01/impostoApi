import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDTO } from './dtos/update_user.dto';
import { UserEntity } from './entities/user.entity';
import { VerifyUserExistsByIdGuard } from './guards/verify_user_exists_by_id.guard';
import { VerifyUserIsNotAlreadyRegisteredGuard } from './guards/verify_user_is_not_already_registered.guard';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
  ) {}

  @UseGuards(VerifyUserIsNotAlreadyRegisteredGuard)
  @ApiCreatedResponse({
    description: 'Usuário cadastrado com sucesso',
    type: UserEntity,
  })
  @ApiInternalServerErrorResponse({
    description: 'Ocorreu um erro ao criar o usuário.',
  })
  @Post('')
  async create(@Body() { email, renda_mensal, nome }: CreateUserDto) {
    return await this._userService.create({
      email,
      renda_mensal,
      nome,
    });
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Usuário encontrado',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
  @ApiInternalServerErrorResponse({
    description: 'Ocorreu um erro ao buscar o usuário.',
  })
  async getById(@Param('id') id: string) {
    return this._userService.getById(id);
  }

  @Get('')
  @ApiOkResponse({
    description: 'Lista de usuários cadastrados',
    isArray: true,
    type: UserEntity,
  })
  @ApiInternalServerErrorResponse({
    description: 'Ocorreu um erro ao buscar os usuários.',
  })
  async getAll() {
    return await this._userService.getAll();
  }

  @UseGuards(VerifyUserExistsByIdGuard)
  @ApiInternalServerErrorResponse({
    description: 'Ocorreu um erro ao atualizar um usuário.',
  })
  @ApiNotFoundResponse({ description: 'Este usuário nao existe.' })
  @ApiOkResponse({
    description: 'Usuário atualizado',
    type: UserEntity,
  })
  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return await this._userService.update(id, body);
  }

  @UseGuards(VerifyUserExistsByIdGuard)
  @ApiInternalServerErrorResponse({
    description: 'Ocorreu um erro ao deletar o usuário.',
  })
  @ApiNotFoundResponse({ description: 'Este usuário nao existe.' })
  @ApiOkResponse({ description: 'Usuário deletado com sucesso.' })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this._userService.deleteUser(id);
  }
}
