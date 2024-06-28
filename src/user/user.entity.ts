import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { List } from 'src/list/list.entity';

/**
 * Entity describes the table in the database. Each
 * class property is DB column in entity table.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isDeleted: boolean; // Safe delete feature

  @OneToMany(() => List, (list) => list.user)
  lists: List[];
}
