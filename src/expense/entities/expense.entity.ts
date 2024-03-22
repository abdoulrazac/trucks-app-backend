import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';

import {File} from '../../file/entities/file.entity';
import {AbstractEntity} from '../../shared/entities/abstract.entity';
import {Vehicle} from '../../vehicle/entities/vehicle.entity';

@Entity('expenses')
export class Expense extends AbstractEntity {
  @Column()
  label: string;

  @Column()
  description: string;

  @Column()
  unitPrice: number;

  @Column()
  unitNumber: number;

  @Column({type : 'simple-array'})
  categories: string[];

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.expenses, { eager: true })
  vehicle: Vehicle;

  @OneToMany(() => File, (file) => file.expense, { eager: true })
  files: File[];
}
