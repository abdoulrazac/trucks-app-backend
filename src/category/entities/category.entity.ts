import { Column, Entity, OneToMany } from 'typeorm';
import { Expense } from '../../expense/entities/expense.entity';
import { AbstractEntity } from '../../shared/entities/abstract.entity';

@Entity('categories')
export class Category extends AbstractEntity {
  @Column({ length: 200 })
  label: string;

  @Column()
  description: string;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];
}
