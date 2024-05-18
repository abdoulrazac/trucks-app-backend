import {Column, Entity, OneToMany} from 'typeorm';

import { CheckPoint } from "../../check-point/entities/check-point.entity";
import {AbstractEntity} from '../../shared/entities/abstract.entity';
import { Travel } from '../../travel/entities/travel.entity';

@Entity('routes')
export class Route extends AbstractEntity {

  @Column({length : 100, default : ''})
  code : string;

  @Column({ length: 200 })
  label: string;

  @Column()
  description: string;

  @OneToMany(() => Travel, (travel) => travel.route)
  travels: Travel[];

  @OneToMany(() => CheckPoint, (checkPoint) => checkPoint.route)
  checkPoints
}
