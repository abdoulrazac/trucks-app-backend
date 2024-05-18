import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';

import {AbstractEntity} from '../../shared/entities/abstract.entity';

@Entity('finance_categories')
export class FinancialCategory extends AbstractEntity {

  @Column({length : 50})
  type : string;

  @Column({ length: 200 })
  label: string;

  @Column()
  description: string;
}
