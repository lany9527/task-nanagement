import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
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
