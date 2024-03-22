import {Column, Entity, ManyToOne, OneToMany} from "typeorm";

import {Vehicle} from "../../vehicle/entities/vehicle.entity";
import {User} from "../../user/entities/user.entity";
import {Travel} from "../../travel/entities/travel.entity";
import {AbstractEntity} from "../../shared/entities/abstract.entity";

@Entity('trucks')
export class Truck extends AbstractEntity {

  @Column()
  description : string ;

  @Column({"default" : false})
  isClosed : boolean ;

  @Column()
  status : string ;

  @ManyToOne(() => User, (user) => user.trucks, { eager : true, cascade : ["insert", "update"]})
  conductor : User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.tractors, { eager : true, cascade : ["insert", "update"]})
  tractor : Vehicle ;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.semiTrailers, { eager : true, cascade : ["insert", "update"]})
  semiTrailer : Vehicle ;

  @OneToMany(() => Travel , (travel) => travel.truck, { cascade : ["insert", "update"]})
  travels : Travel[] ;
}
