import {Column, Entity, ManyToOne, OneToMany, Unique,} from 'typeorm';

import {Company} from '../../company/entities/company.entity';
import {File} from '../../file/entities/file.entity';
import {Invoice} from '../../invoice/entities/invoice.entity';
import { Route } from "../../route/entities/route.entity";
import {AbstractEntity} from '../../shared/entities/abstract.entity';
import {Truck} from '../../truck/entities/truck.entity';
import { TravelCheckPoint } from "./../../travel-check-point/entities/travel-check-point.entity";

@Entity('travels')
export class Travel extends AbstractEntity {
  @Unique('refTravel', ['refTravel'])
  @Column({ length: 100 })
  refTravel: string;

  @Column({ length: 100 })
  product: string;

  @Column({nullable: true})
  signatureDate: Date;

  @Column({nullable: true})
  status: string;

  @Unique('refUnloading', ['refUnloading'])
  @Column({ length: 100, nullable: true})
  refUnloading: string;

  @Column({nullable: true})
  departureDate: Date;

  @Column({nullable: true})
  arrivalDate: Date;

  @Column({nullable: true})
  description : string ;

  @Column({nullable: true})
  departureCountry: string;

  @Column({nullable: true})
  departureCity: string;

  @Column({nullable: true})
  arrivalCountry: string;

  @Column({nullable: true})
  arrivalCity: string;

  @Column({nullable: true, type: 'float'})
  truckWeight: number;

  @Column({nullable: true, type: 'float'})
  departureWeight: number;

  @Column({nullable: true, type: 'float'})
  arrivalWeight: number;

  @ManyToOne(() => Company, (company) => company.travels, { eager: true})
  company: Company;

  @ManyToOne(() => Invoice, (invoice) => invoice.travels, { eager: true, nullable : true , cascade : ['insert', 'update']})
  invoice: Invoice;

  @ManyToOne(() => Truck, (truck) => truck.travels, { eager: true, cascade : ['insert', 'update'] })
  truck: Truck;

  @OneToMany(() => File, (file) => file.travel)
  files: File[];

  @ManyToOne(() => Route, (route) => route.travels, { eager: false, cascade : ['insert', 'update'] })
  route: Route;

  @OneToMany(() => TravelCheckPoint, (travelCheckPoint) => travelCheckPoint.travel, { onDelete: 'CASCADE'})
  travelCheckPoints: TravelCheckPoint[];
}
