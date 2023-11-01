import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity'; // 导入用户实体
import { Task } from '../task/entities/task.entity'; // 导入任务实体
import { UserTask } from './entities/user-task.entity'; // 导入用户任务实体

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository(UserTask)
    private userTaskRepository: Repository<UserTask>,
  ) {}

  async addUserToTask(userId: number, taskId: number): Promise<UserTask> {
    const userTask = new UserTask();

    // 设置 user 和 task 属性
    userTask.user = { id: userId } as User;
    userTask.task = { id: taskId } as Task;

    // 保存 userTask 实例到数据库
    return this.userTaskRepository.save(userTask);
  }

  async removeUserFromTask(userId: number, taskId: number): Promise<void> {
    await this.userTaskRepository
      .createQueryBuilder()
      .delete()
      .from(UserTask)
      .where('user.id = :userId', { userId })
      .andWhere('task.id = :taskId', { taskId })
      .execute();
  }

  async getUsersForTask(taskId: number): Promise<User[]> {
    const userTasks = await this.userTaskRepository.find({
      where: { task: { id: taskId } },
      relations: ['user'],
    });
    return userTasks.map((userTask) => userTask.user);
  }

  async getTasksForUser(userId: number): Promise<Task[]> {
    const userTasks = await this.userTaskRepository.find({
      where: { user: { id: userId } },
      relations: ['task'],
    });
    return userTasks.map((userTask) => userTask.task);
  }
}
