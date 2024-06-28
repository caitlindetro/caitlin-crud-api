import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { List } from 'src/list/list.entity';

// DTO stands for data transfer object. This class's main goal is to
// make sure that model's (or entity's) data structure remains the same
// across different layers of the application. In case of nest framework,
// we can also use DTO class as validation pipe (by using corresponding decorators)
// when we process the incoming HTTP request.
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  // @IsEnum(List)
  // list: List;
}
