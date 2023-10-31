import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty({ message: '任务标题不能为空' })
  title: string;

  @IsNotEmpty({ message: '任务内容不能为空' })
  content: string;
}
