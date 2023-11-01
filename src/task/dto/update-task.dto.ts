import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'id',
  })
  @IsNotEmpty({ message: '任务标题不能为空' })
  id: number;

  @ApiProperty({
    description: '任务标题',
  })
  @IsNotEmpty({ message: '任务标题不能为空' })
  title: string;

  @ApiProperty({
    description: '任务内容',
  })
  @IsNotEmpty({ message: '任务内容不能为空' })
  content: string;
}
