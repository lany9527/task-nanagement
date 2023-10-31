import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    console.log('update ', updateUserDto);
    return this.userService.update(updateUserDto);
  }

  @Delete('delete')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Post('login')
  async login(
    @Body() data: { username: string; password: string },
  ): Promise<User | undefined> {
    const { username, password } = data;
    const user = await this.userService.findUserByUsername(username);
    if (!user || user.password !== password) {
      return undefined;
    }
    return user;
  }

  @Post('register')
  async register(@Body() userData: CreateUserDto): Promise<User> {
    console.log('register ', userData);
    const { username } = userData;
    const existUser: User = await this.userService.findUserByUsername(username);
    if (existUser) {
      throw new NotFoundException(`用户${username}已存在`);
    }
    return this.userService.create(userData);
  }
}
