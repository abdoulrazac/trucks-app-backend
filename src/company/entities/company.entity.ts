import {
  Column,
  Entity,
  OneToMany,
  Unique,
} from 'typeorm';

import { File } from "../../file/entities/file.entity";
import {Invoice} from "../../invoice/entities/invoice.entity";
import { AbstractEntity } from "../../shared/entities/abstract.entity";
import {Travel} from "../../travel/entities/travel.entity";

@Entity('companies')
export class Company extends AbstractEntity {

  @Column({ length: 200 })
  shortname: string;

  @Column()
  longname: string;

  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

  @Column()
  numTel: string;

  @Column()
  address: string;

  @Column()
  numPostal: string;

  @Column()
  country: string;

  @Column()
  city: string;

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

  @Column({nullable: true})
  avatar: string;

  @OneToMany(() => Travel, (travel) => travel.company)
  travels: Travel[];

  @OneToMany(() => Invoice, (invoice) => invoice.company)
  invoices: Invoice[];

  @OneToMany(() => File, (file) => file.company)
  files: File[];
}
