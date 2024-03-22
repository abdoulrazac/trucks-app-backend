import { Column, Entity, ManyToOne, OneToMany, AfterLoad, Unique } from 'typeorm';
import { Contract } from '../../contract/entities/contract.entity';
import { Truck } from '../../truck/entities/truck.entity';
import { File } from '../../file/entities/file.entity';
import { AbstractEntity } from '../../shared/entities/abstract.entity';
import { EmailChange } from './email-change.entity';
import { EmailVerification } from './email-verification.entity';
import { PasswordReset } from './password-reset.entity';

@Entity('users')
export class User extends AbstractEntity {
  @Column({ length: 100 })
  name: string;

  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

  @Column()
  password: string;

  @Unique('username', ['username'])
  @Column({ length: 200 })
  username: string;

  @Column('simple-array')
  roles: string[];

  @Column({ default: false })
  isAccountDisabled: boolean;

  @Column()
  status: string;

  @Column({ default: false })
  isAssigned: boolean;

  @Column()
  numTel: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({default : 0, type : 'tinyint'})
  attempts: number;

  @OneToMany(() => EmailChange, (emailChange) => emailChange.user, { cascade: ['insert', 'update'] })
  emailChanges: EmailChange[];

  @OneToMany( () => EmailVerification, (emailVerification) => emailVerification.user, { cascade: ['insert', 'update'] })
  emailVerifications: EmailVerification[];

  @OneToMany( () => PasswordReset, (passwordReset) => passwordReset.user, { cascade: ['insert', 'update'] })
  passwordResets: PasswordReset[];

  @OneToMany(() => Truck, (truck) => truck.conductor)
  trucks: Truck[];

  @OneToMany(() => Contract, (contract) => contract.author)
  contracts: Contract[];

  @OneToMany(() => File, (file) => file.author)
  files: File[];
}


