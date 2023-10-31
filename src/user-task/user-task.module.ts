import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Task } from '../task/entities/task.entity';
import { UserTaskController } from './user-task.controller';
import { UserTaskService } from './user-task.service';
import { UserTask } from './entities/user-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task, UserTask])],
  controllers: [UserTaskController],
  providers: [UserTaskService],
})
export class UserTaskModule {}
