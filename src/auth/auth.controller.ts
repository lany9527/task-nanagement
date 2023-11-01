import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: { username: string; password: string }) {
    const { username, password } = data;

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new NotFoundException(`用户或密码不正确`);
    }

    // 用户验证成功，生成访问令牌
    const accessToken = await this.authService.generateAccessToken(user);

    return { token: accessToken, user };
  }
}
