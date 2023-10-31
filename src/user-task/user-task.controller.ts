import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { UserTaskService } from './user-task.service';

@Controller('user-task')
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) {}

  @Post('addUserToTask')
  async addUserToTask(
    @Param('userId') userId: number,
    @Param('taskId') taskId: number,
  ) {
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

  @Get('users-for-task/:taskId')
  async getUsersForTask(@Param('taskId') taskId: number) {
    const users = await this.userTaskService.getUsersForTask(taskId);
    return users;
  }

  @Get('tasks-for-user/:userId')
  async getTasksForUser(@Param('userId') userId: number) {
    const tasks = await this.userTaskService.getTasksForUser(userId);
    return tasks;
  }
}
