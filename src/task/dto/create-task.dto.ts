import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: '任务标题不能为空' })
  title: string;

  @IsNotEmpty({ message: '任务内容不能为空' })
  content: string;
}
