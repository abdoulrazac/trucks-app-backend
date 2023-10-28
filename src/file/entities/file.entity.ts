import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expense } from '../../expense/entities/expense.entity';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { AbstractEntity } from '../../shared/entities/abstract.entity';
import { Travel } from '../../travel/entities/travel.entity';

@Entity('files')
export class File extends AbstractEntity {
  @Column({ length: 200 })
  label: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  extension: string;

  @Column()
  size: number;

  @Column()
  link: string;

  @ManyToOne(() => User, (user) => user.files)
  author: User;

  @ManyToOne(() => Company, (company) => company.files)
  company: Company;

  @ManyToOne(() => Expense, (expense) => expense.files)
  expense: Expense;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.files)
  vehicle: Vehicle;

  @ManyToOne(() => Travel, (travel) => travel.files)
  travel: Travel;

  @ManyToOne(() => Invoice, (invoice) => invoice.files)
  invoice: Invoice;
}
