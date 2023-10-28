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

import { Company } from '../../company/entities/company.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Truck } from '../../truck/entities/truck.entity';
import { AbstractEntity } from '../../shared/entities/abstract.entity';
import { File } from '../../file/entities/file.entity';

@Entity('travels')
export class Travel extends AbstractEntity {
  @Unique('refTravel', ['refTravel'])
  @Column({ length: 100 })
  refTravel: string;

  @Column()
  signatureDate: Date;

  @Column({ length: 100 })
  product: string;

  @Column()
  status: string;

  @Column()
  departureDate: Date;

  @Column()
  arrivalDate: Date;

  @Column()
  departureCity: string;

  @Column()
  arrivalCity: string;

  @Column()
  departureWeight: number;

  @Column()
  arrivalWeight: number;

  @ManyToOne(() => Company, (company) => company.travels, { eager: true })
  company: Company;

  @ManyToOne(() => Invoice, (invoice) => invoice.travels, { eager: true })
  invoice: Invoice;

  @ManyToOne(() => Truck, (truck) => truck.travels, { eager: true })
  truck: Truck;

  @OneToMany(() => File, (file) => file.travel)
  files: File[];
}
