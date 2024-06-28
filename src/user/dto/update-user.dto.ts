import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

// This is empty because PartialType function allows us to use
// all the parameters and their validation rules from create user
// dto but without making all of them required, so you get the ability
// to update specific fields.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
