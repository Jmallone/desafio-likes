import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './user.model';

@Entity()
export default class ActiveSession {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'text', nullable: false })
    token!: string;

    @Column({ type: 'integer' , nullable: false })
    userId!: number;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    date?: string;

    @ManyToOne(() => User, (user) => user.activeSessions)
    user!: User;
}
