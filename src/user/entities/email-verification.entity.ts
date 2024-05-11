import {BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn} from 'typeorm';

import { User } from './user.entity';

@Entity('email_verification')
export class EmailVerification {

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