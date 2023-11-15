import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import {AbstractEntity} from '../../shared/entities/abstract.entity';

@Entity('categories')
export class Category extends AbstractEntity {

  @Column({length : 20, default : ''})
  code : string;

  @Column({ length: 200 })
  label: string;

  @Column()
  description: string;

  @OneToMany(() => Category, (category) => category.group)
  categories: Category[];

  @ManyToOne(() => Category, (category) => category.categories)
  group: Category;
}
