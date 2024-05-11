import {Column, Entity, ManyToOne} from 'typeorm';

import { Breakdown } from '../../breakdown/entities/breakdown.entity';
import {Company} from '../../company/entities/company.entity';
import { Contract } from '../../contract/entities/contract.entity';
import {Expense} from '../../expense/entities/expense.entity';
import {Invoice} from '../../invoice/entities/invoice.entity';
import {AbstractEntity} from '../../shared/entities/abstract.entity';
import {Travel} from '../../travel/entities/travel.entity';
import {User} from '../../user/entities/user.entity';
import {Vehicle} from '../../vehicle/entities/vehicle.entity';

@Entity('files')
export class File extends AbstractEntity {
  @Column({ length: 200 })
  label: string;

  @Column()
  description: string;

  @Column({default : false})
  notification : boolean 

  @Column('simple-array')
  categories: string[];

  @Column()
  extension: string;

  @Column({nullable: true})
  deliverAt: Date;

  @Column({nullable: true})
  expireAt: Date;

  @Column()
  size: number;

  @Column()
  link: string;

  @ManyToOne(() => User, (user) => user.files)
  author: User;

  @ManyToOne(() => Company, (company) => company.files)
  company: Company;

  @ManyToOne(() => Expense, (expense) => expense.files)
  expense: Expense;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.files)
  vehicle: Vehicle;

  @ManyToOne(() => Travel, (travel) => travel.files)
  travel: Travel;

  @ManyToOne(() => Invoice, (invoice) => invoice.files)
  invoice: Invoice;

  @ManyToOne(() => Contract, (contract) => contract.files)
  contract: Contract;

  @ManyToOne(() => Breakdown, (breakdown) => breakdown.files)
  breakdown: Breakdown;
}
