import { Column, Entity, JoinColumn,ManyToOne, OneToMany, OneToOne } from "typeorm";

import {File} from '../../file/entities/file.entity';
import {AbstractEntity} from '../../shared/entities/abstract.entity';
import { User } from "../../user/entities/user.entity";
import {Vehicle} from '../../vehicle/entities/vehicle.entity';
import { Breakdown } from "./../../breakdown/entities/breakdown.entity";
import { Invoice } from "./../../invoice/entities/invoice.entity";

@Entity('finances')
export class Finance extends AbstractEntity {

  @Column({default: '', nullable: true})
  transactionRef: string;

  @Column()
  type : string;

  @Column()
  label: string;

  @Column({default: '', nullable: true})
  description: string;

  @Column({type: 'float'})
  unitPrice: number;

  @Column()
  unitNumber: number;

  @Column({type : 'simple-array'})
  categories: string[];

  @Column()
  transactionDate: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.finances)
  vehicle: Vehicle;

  @ManyToOne(() => Breakdown, (breakdown) => breakdown.finances)
  breakdown: Breakdown;

  @ManyToOne(() => User, (user) => user.finances)
  user: User;

  @OneToOne(() => Invoice, {cascade: ['insert', 'update']})
  @JoinColumn()
  invoice: Invoice;

  @OneToMany(() => File, (file) => file.finance)
  files: File[];
}
