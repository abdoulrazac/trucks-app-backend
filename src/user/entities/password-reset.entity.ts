import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  Unique,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert, BeforeUpdate
} from 'typeorm';
import { User } from './user.entity';

@Entity('password_reset')
export class PasswordReset {

    @PrimaryColumn()
    token: string;
  
    @Column()
    newEmail: string;
    
    @ManyToOne(() => User, (user) => user.emailChanges)
    user: User;

    @Column()
    validUntil: Date;

    @BeforeInsert()
    async setValidUntil() {
      this.validUntil = new Date(new Date().getTime() + 1000 * 60 * 15);
    }
}
