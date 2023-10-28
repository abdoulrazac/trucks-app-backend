import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Travel } from '../../travel/entities/travel.entity';
import { Company } from '../../company/entities/company.entity';
import { File } from '../../file/entities/file.entity';
import { AbstractEntity } from "../../shared/entities/abstract.entity";

@Entity('invoices')
export class Invoice extends AbstractEntity {

  @Unique('numInvoice', ['numInvoice'])
  @Column({ length: 100 })
  numInvoice: string;

  @Column()
  unitPriceExtern: number;

  @Column()
  unitPriceIntern: number;

  @Column()
  valueTva: number;

  @Column()
  valueRetain: number;

  @Column()
  status: string;

  @OneToMany(() => Travel, (travel) => travel.invoice, {
    cascade: ['insert', 'update'],
  })
  travels: Travel[];

  @ManyToOne(() => Company, (company) => company.invoices, { eager: true })
  company: Company;

  @OneToMany(() => File, (file) => file.invoice)
  files: File[];
}
