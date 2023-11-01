import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() // 自动生成创建日期
  createdAt: Date;

  @UpdateDateColumn() // 自动生成更新日期
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

  @Column({ type: 'date' }) // 定义日期属性
  birth: Date;

  @Column()
  sex: string;

  @Column()
  phone: string;

  @Column()
  avatar: string;

  @Column()
  roles: string[];
}
