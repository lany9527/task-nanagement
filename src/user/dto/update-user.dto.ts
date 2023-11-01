import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'id',
  })
  @IsNotEmpty({ message: 'is不能为空' })
  id: number;

  @ApiProperty({
    description: '用户名',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({
    description: '电子邮箱',
  })
  @IsNotEmpty({ message: '电子邮箱不能为空' })
  @IsEmail({}, { message: '电子邮箱格式不正确' })
  email: string;

  @ApiProperty({
    description: '密码',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码至少包含6个字符' })
  password: string;
}
