import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';

import { Route } from "../../route/entities/route.entity";
import {AbstractEntity} from '../../shared/entities/abstract.entity';
import { TravelCheckPoint } from "./../../travel-check-point/entities/travel-check-point.entity";

@Entity('checkPoints')
export class CheckPoint extends AbstractEntity {

  @Column({ type: 'int'})
  rank: number;

  @Column({ length: 200 })
  label: string;

  @Column()
  description: string;

  @ManyToOne(() => Route, (route) => route.checkPoints)
  route: Route;

  @OneToMany(() => TravelCheckPoint, (travelCheckPoint) => travelCheckPoint.checkPoint, { onDelete: 'CASCADE'})
  travelCheckPoints: TravelCheckPoint[];
}




