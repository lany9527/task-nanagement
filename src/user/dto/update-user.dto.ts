// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';
import { IsArray, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'id',
  })
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;

  @ApiProperty({
    description: '用户名',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({
    description: '真实姓名',
  })
  @IsNotEmpty({ message: '真实姓名不能为空' })
  realName: string;

  @ApiProperty({
    description: '昵称',
  })
  @IsNotEmpty({ message: '昵称不能为空' })
  nickName: string;

  @ApiProperty({
    description: '电子邮箱',
  })
  @IsEmail({}, { message: '电子邮箱格式不正确' })
  email: string;

  @ApiProperty({
    description: '密码',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码至少包含6个字符' })
  password: string;

  @ApiProperty({
    description: '年龄',
    minimum: 0,
  })
  age: number;

  @ApiProperty({
    description: '出生日期',
  })
  birth: string;

  @ApiProperty({
    description: '性别;  男 = 0, 女 = 1,',
  })
  sex: string;

  @ApiProperty({
    description: '手机号',
  })
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  @ApiProperty({
    description: '用户头像',
  })
  avatar: string;

  @ApiProperty({
    description: '用户角色',
  })
  @IsArray()
  roles: string[];
}
