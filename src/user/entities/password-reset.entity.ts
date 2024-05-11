import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { User } from './user.entity';

@Entity('password_reset')
export class PasswordReset {

    @PrimaryColumn()
    token: string;
    
    @ManyToOne(() => User, (user) => user.emailChanges)
    user: User; 

    @CreateDateColumn({ name: 'createdAt', nullable: true })
    createdAt: Date;
}