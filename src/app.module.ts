import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { UserTaskModule } from './user-task/user-task.module';
import { Task } from './task/entities/task.entity';
import { UserTask } from './user-task/entities/user-task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'task',
      entities: [User, Task, UserTask],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TaskModule,
    UserTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
