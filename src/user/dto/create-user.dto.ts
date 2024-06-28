import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

// DTO stands for data transfer object. This class's main goal is to
// make sure that model's (or entity's) data structure remains the same
// across different layers of the application. In case of nest framework,
// we can also use DTO class as validation pipe (by using corresponding decorators)
// when we process the incoming HTTP request.
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must have at least 6 characters.' })
  password: string;
}
