import {
  Column, 
  Entity, 
  ManyToOne,
  OneToMany} from 'typeorm';

import {File} from "../../file/entities/file.entity";
import { AbstractEntity } from "../../shared/entities/abstract.entity";
import {User} from "../../user/entities/user.entity";

@Entity('contracts')
export class Contract extends AbstractEntity {

  @Column({unique: true, nullable: true})
  refContract: string;

  @Column()
  type: string;

  @Column({type: 'float'})
  primePercent: number ;

  @Column()
  primeTravelLimit : number ;

  @Column({type: 'float'})
  amount: number;

  @Column()
  startDate : Date ;

  @Column({nullable : true})
  endDate : Date ;

  @Column({'default' : false})
  isClosed: boolean;

  @Column()
  description : string ;

  @ManyToOne(() => User, (user) => user.contracts, { eager: true })
  author: User ;

  @OneToMany(() => File, (file) => file.contract)
  files: File[];
}
