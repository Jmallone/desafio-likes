import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './user.model';

@Entity()
export default class Book {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'text', nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  author!: string;
  
  @ManyToOne(() => User, user => user.books)
    user!: User;

}