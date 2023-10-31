import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findUserByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findUserByUsername(username);

    if (user && (await this.comparePasswords(password, user.password))) {
      // 如果用户名和密码匹配，返回用户对象
      return user;
    }

    // 如果用户不存在或密码不匹配，返回 null
    return null;
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateAccessToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }
}
