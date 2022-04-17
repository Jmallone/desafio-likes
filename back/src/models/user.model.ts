import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Book from './book.model';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'text', nullable: false })
  username!: string;

  @Column({ type: 'text', nullable: false })
  email!: string;

  @Column({ type: 'text', nullable: false })
  password!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date?: Date;

  @OneToMany(() => Book, book => book.user)
  books!: Book[];

}