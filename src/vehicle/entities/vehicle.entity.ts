import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import {Expense} from "../../expense/entities/expense.entity";
import {Travel} from "../../travel/entities/travel.entity";
import { Truck } from "../../truck/entities/truck.entity";
import { File } from "../../file/entities/file.entity";

@Entity('vehicles')
export class Vehicle {
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

  @CreateDateColumn({ name: 'createdAt', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Truck, (truck) => truck.tractor)
  tractors: Travel[];

  @OneToMany(() => Truck, (truck) => truck.semiTrailer)
  semiTrailers: Travel[];

  @OneToMany(() => Expense, (expense) => expense.vehicle)
  expenses : Expense[];

  @OneToMany(() => File, (file) => file.vehicle)
  files : File[];
}
