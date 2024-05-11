import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm';

import { Travel } from '../../travel/entities/travel.entity';
import { CheckPoint } from "./../../check-point/entities/check-point.entity";

@Entity('travel_check_point')
export class TravelCheckPoint {
  @PrimaryColumn()
  travelId: number;

  @PrimaryColumn()
  checkPointId: number;

  @Column({nullable: true})
  description: string;

  @CreateDateColumn({ name: 'createdAt', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date; 

  @ManyToOne(() => CheckPoint, (checkPoint) => checkPoint.travelCheckPoints, { eager: true})
  @JoinTable({ 
    name: 'travel_check_point',
    joinColumn : {name: 'CheckPointId'},
    inverseJoinColumn : {name: 'checkPointId'}
  })
  checkPoint: CheckPoint;

  @JoinTable({ 
    name: 'travel_check_point',
    joinColumn : {name: 'travelId'},
    inverseJoinColumn : {name: 'TravelId'}
  })
  @ManyToOne(() => Travel, (travel) => travel.travelCheckPoints)
  @JoinColumn({ name: 'travelId' })
  travel: Travel;
}




