import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  Body,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserTaskService } from './user-task.service';

@Controller('user-task')
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) {}

  @Post('addUserToTask')
  async addUserToTask(@Body() data: { userId: number; taskId: number }) {
    const { userId, taskId } = data;
    console.log('co addUserToTask ', userId, taskId);
    const userTask = await this.userTaskService.addUserToTask(userId, taskId);
    return userTask;
  }

  @Delete('remove/:userId/from/:taskId')
  async removeUserFromTask(
    @Param('userId') userId: number,
    @Param('taskId') taskId: number,
  ) {
    await this.userTaskService.removeUserFromTask(userId, taskId);
  }

  @Get('getUsersByTaskId')
  async getUsersByTaskId(@Query('taskId') taskId: number) {
    if (taskId === undefined || taskId === null) {
      // 如果userId为空，返回错误响应
      throw new HttpException('taskId is required', HttpStatus.BAD_REQUEST);
    }
    const users = await this.userTaskService.getUsersByTaskId(taskId);
    return users;
  }

  @Get('getTasksByUserId')
  async getTasksByUserId(@Query('userId') userId: number) {
    console.log('getTasksByUserId ', userId);
    if (userId === undefined || userId === null) {
      // 如果userId为空，返回错误响应
      throw new HttpException('userId is required', HttpStatus.BAD_REQUEST);
    }
    const tasks = await this.userTaskService.getTasksByUserId(userId);
    return tasks;
  }
}
