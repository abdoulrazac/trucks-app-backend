import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

import { Company } from '../../company/entities/company.entity';
import { File } from '../../file/entities/file.entity';
import { AbstractEntity } from "../../shared/entities/abstract.entity";
import { Travel } from '../../travel/entities/travel.entity';

@Entity('invoices')
export class Invoice extends AbstractEntity {

  @Column()
  invoiceDate: Date;

  @Unique('numInvoice', ['numInvoice'])
  @Column({ length: 100 })
  numInvoice: string;

  @Column({nullable: true })
  description: string;

  @Column({type: 'float'})
  unitPriceExtern: number;

  @Column({type: 'float'})
  unitPriceIntern: number;

  @Column({type: 'float'})
  valueTva: number;

  @Column({type: 'float'})
  valueRetain: number;

  @Column()
  status: string;

  @OneToMany(() => Travel, (travel) => travel.invoice, {cascade: ['insert', 'update']})
  travels: Travel[];

  @ManyToOne(() => Company, (company) => company.invoices)
  company: Company;

  @OneToMany(() => File, (file) => file.invoice)
  files: File[];
}
