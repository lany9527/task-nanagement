import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class UserTask {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Task)
  @JoinColumn()
  task: Task;

  // 其他属性
}
