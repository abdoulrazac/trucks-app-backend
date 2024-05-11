import {
  Column, 
  Entity, 
  ManyToOne,
  OneToMany,
  Unique
} from 'typeorm';

import {File} from "../../file/entities/file.entity";
import { AbstractEntity } from "../../shared/entities/abstract.entity";
import { Vehicle } from '../../vehicle/entities/vehicle.entity';

@Entity('breakdowns')
export class Breakdown extends AbstractEntity {
  
  @Unique('refBreakdown', ['refBreakdown'])
  @Column({ length: 100 })
  refBreakdown: string;

  @Column()
  type: string;

  @Column()
  status : string ;
  
  @Column()
  label: string;

  @Column()
  description : string ;

  @Column()
  occurredAt: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.breakdowns, { eager: true })
  vehicle: Vehicle ;

  @OneToMany(() => File, (file) => file.breakdown)
  files: File[];
}
