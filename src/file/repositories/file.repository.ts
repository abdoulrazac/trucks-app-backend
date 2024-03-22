import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository, Between} from "typeorm";
import * as moment from "moment";

import {File} from "../entities/file.entity";

@Injectable()
export class FileRepository extends Repository<File>{

  constructor(private dataSource: DataSource) {
    super(File, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<File> {
    const file = await this.findOne({ where: { id } });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
  async getFullById(id: number): Promise<File> {
    const file = await this.findOne({
      where: { id },
      relations : {
        author : true,
        expense : true,
        vehicle : true,
        company : true
      } });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async getFileExpensesById(id: number): Promise<File> {
    const file = await this.findOne({
      where: { id }
    });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async getFutureExpiredFiles(): Promise<File[]> {
    const currentDate = moment().utc(); 
    return await this.find({
      relations : {
        author : true,
        expense : true,
        vehicle : true,
        company : true,
        travel : true,
        invoice : true
      },
      where: [
        {notification : true, expireAt : Between(currentDate.toDate(), currentDate.add(1, 'days').toDate())},
        {notification : true, expireAt : Between(currentDate.add(3, 'days').toDate(), currentDate.add(4, 'days').toDate())},
        {notification : true, expireAt : Between(currentDate.add(7, 'days').toDate(), currentDate.add(8, 'days').toDate())},
        {notification : true, expireAt : Between(currentDate.add(14, 'days').toDate(), currentDate.add(15, 'days').toDate())},
        {notification : true, expireAt : Between(currentDate.add(30, 'days').toDate(), currentDate.add(31, 'days').toDate())},
      ]
    });
  }
}
