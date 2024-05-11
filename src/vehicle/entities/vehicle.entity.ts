import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Breakdown } from '../../breakdown/entities/breakdown.entity';
import {Expense} from "../../expense/entities/expense.entity";
import {File} from "../../file/entities/file.entity";
import { AbstractEntity } from '../../shared/entities/abstract.entity';
import {Travel} from "../../travel/entities/travel.entity";
import {Truck} from "../../truck/entities/truck.entity";

@Entity('vehicles')
export class Vehicle extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique('numImat', ['numImat'])
  @Column({ length: 100 })
  numImat: string;

  @Column()
  vehicleType: string;

  @Column()
  vehicleColor: string;

  @Column()
  brand: string;

  @Column()
  vehicleModel: string;

  @Column()
  volume: number;

  @Column()
  axleNumber : number;

  @Column( { "default": false})
  isAssigned: boolean; 
  
  @OneToMany(() => Truck, (truck) => truck.tractor)
  tractors: Travel[];

  @OneToMany(() => Truck, (truck) => truck.semiTrailer)
  semiTrailers: Travel[];

  @OneToMany(() => Expense, (expense) => expense.vehicle)
  expenses : Expense[];

  @OneToMany(() => File, (file) => file.vehicle)
  files : File[];

  @OneToMany(() => Breakdown, (breakdown) => breakdown.vehicle)
  breakdowns : Breakdown[];
}
