import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Category } from "../../category/entities/category.entity";
import { Vehicle } from "../../vehicle/entities/vehicle.entity";
import { File } from "../../file/entities/file.entity";
import { AbstractEntity } from "../../shared/entities/abstract.entity";

@Entity('expenses')
export class Expense extends AbstractEntity {

  @Column()
  label : string;

  @Column()
  description : string;

  @Column()
  unitPrice : number ;

  @Column()
  unitNumber : number ;

  @ManyToOne(() => Category, (category) => category.expenses, { eager: true })
  category : Category;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.expenses, { eager: true })
  vehicle : Vehicle ;

  @OneToMany(() => File, (file) => file.expense, { eager: true })
  files : File[] ;
}
