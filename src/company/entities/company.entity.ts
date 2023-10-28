import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import {Invoice} from "../../invoice/entities/invoice.entity";
import {Travel} from "../../travel/entities/travel.entity";
import { File } from "../../file/entities/file.entity";
import { AbstractEntity } from "../../shared/entities/abstract.entity";

@Entity('companies')
export class Company extends AbstractEntity {

  @Column({ length: 200 })
  shortname: string;

  @Column()
  longname: string;

  @Column()
  address: string;

  @Column()
  numTel: string;

  @Column()
  numPostal: string;

  @Unique('numRccm', ['numRccm'])
  @Column()
  numRccm: string;

  @Unique('numIfu', ['numIfu'])
  @Column()
  numIfu: string;

  @Column()
  taxSystem: string;

  @Column()
  taxDivision: string;

  @Column()
  avatar: string;

  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

  @OneToMany(() => Travel, (travel) => travel.company)
  travels: Travel[];

  @OneToMany(() => Invoice, (invoice) => invoice.company)
  invoices: Invoice[];

  @OneToMany(() => File, (file) => file.company)
  files: File[];
}
