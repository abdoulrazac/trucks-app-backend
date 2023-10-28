import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {User} from "../../user/entities/user.entity";
import { AbstractEntity } from "../../shared/entities/abstract.entity";

@Entity('contracts')
export class Contract extends AbstractEntity {

  @Column()
  type: string;

  @Column()
  primePercent: number ;

  @Column()
  primeTravelLimit : number ;

  @Column()
  amount: number;

  @Column()
  startDate : Date ;

  @Column()
  endDate : Date ;

  @Column({'default' : false})
  isClosed: boolean;

  @Column()
  description : string ;

  @ManyToOne(() => User, (user) => user.contracts, { eager: true })
  author: User ;
}
