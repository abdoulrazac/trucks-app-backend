import {Column, Entity, ManyToOne, OneToMany, Unique,} from 'typeorm';

import {Company} from '../../company/entities/company.entity';
import {Invoice} from '../../invoice/entities/invoice.entity';
import {Truck} from '../../truck/entities/truck.entity';
import {AbstractEntity} from '../../shared/entities/abstract.entity';
import {File} from '../../file/entities/file.entity';

@Entity('travels')
export class Travel extends AbstractEntity {
  @Unique('refTravel', ['refTravel'])
  @Column({ length: 100 })
  refTravel: string;

  @Column({nullable: true})
  signatureDate: Date;

  @Column({ length: 100 })
  product: string;

  @Column({nullable: true})
  status: string;

  @Column({nullable: true})
  departureDate: Date;

  @Column({nullable: true})
  arrivalDate: Date;

  @Column()
  departureCity: string;

  @Column()
  arrivalCity: string;

  @Column({nullable: true})
  truckWeight: number;

  @Column({nullable: true})
  departureWeight: number;

  @Column({nullable: true})
  arrivalWeight: number;

  @ManyToOne(() => Company, (company) => company.travels, { eager: true})
  company: Company;

  @ManyToOne(() => Invoice, (invoice) => invoice.travels, { eager: true, nullable : true , cascade : ['insert', 'update']})
  invoice: Invoice;

  @ManyToOne(() => Truck, (truck) => truck.travels, { eager: true, cascade : ['insert', 'update'] })
  truck: Truck;

  @OneToMany(() => File, (file) => file.travel)
  files: File[];
}
