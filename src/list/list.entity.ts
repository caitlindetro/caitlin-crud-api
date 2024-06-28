import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Task } from 'src/task/task.entity';

/**
 * Entity describes the table in the database. Each
 * class property is DB column in entity table.
 */
@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.lists)
  user: User;

  @OneToMany(() => Task, (task) => task.list)
  tasks: Task[];
}
