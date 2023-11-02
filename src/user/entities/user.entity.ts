import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'datetime' }) // 自动生成创建日期
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' }) // 自动生成更新日期
  updatedAt: Date;

  @Column()
  username: string;

  @Column()
  realName: string;

  @Column()
  nickName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  birth: string;

  @Column()
  sex: string;

  @Column()
  phone: string;

  @Column()
  avatar: string;

  @Column('json')
  roles: string[];
}
