import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create_user.dto';

export class UpdateUserDTO extends PartialType(CreateUserDto) {}
