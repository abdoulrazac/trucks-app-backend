import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Contract } from '../../contract/entities/contract.entity';
import { Truck } from '../../truck/entities/truck.entity';
import { File } from '../../file/entities/file.entity';
import { AbstractEntity } from '../../shared/entities/abstract.entity';

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

  @OneToMany(() => Truck, (truck) => truck.conductor)
  trucks: Truck[];

  @OneToMany(() => Contract, (contract) => contract.author)
  contracts: Contract[];

  @OneToMany(() => File, (file) => file.author)
  files: File[];
}
