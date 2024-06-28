import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { List } from 'src/list/list.entity';

/**
 * Entity describes the table in the database. Each
 * class property is DB column in entity table.
 */
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => List, (list) => list.tasks)
  list: List;
}
