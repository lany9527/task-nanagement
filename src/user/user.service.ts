import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 使用 plainToClass 将 CreateUserDto 转换为 User 实体对象
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10); // 使用bcrypt对密码进行哈希，10是盐值轮数
    const defaultRoles = ['user']; // 设置默认的角色数组
    const newUser = plainToClass(User, {
      ...userData,
      password: hashedPassword,
      roles: userData.roles || defaultRoles, // 如果没有传入 roles，则使用默认值
    });
    return this.userRepository.save(newUser);
  }

  /**
   * 获取用户列表
   * @param page
   * @param limit
   * @param searchParams
   */
  async findAll(
    page: number,
    limit: number,
    searchParams?: object,
  ): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    if (searchParams) {
      for (const key in searchParams) {
        if (searchParams[key]) {
          queryBuilder.andWhere(`user.${key} LIKE :${key}`, {
            [key]: `%${searchParams[key]}%`,
          });
        }
      }
    }

    return paginate<User>(queryBuilder, { page, limit });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    // 使用 plainToClass 将 updateUserDto 转换为 User 实体对象
    const { id, password, ...userData } = updateUserDto;
    const hashedPassword = await bcrypt.hash(password, 10); // 使用bcrypt对密码进行哈希，10是盐值轮数
    const defaultRoles = ['user']; // 设置默认的角色数组
    const newUser = plainToClass(User, {
      ...userData,
      password: hashedPassword,
      roles: userData.roles || defaultRoles, // 如果没有传入 roles，则使用默认值
    });
    await this.userRepository.update(id, newUser);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
