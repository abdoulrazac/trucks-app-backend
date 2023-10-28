import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

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

  async getFileExpensesById(id: number): Promise<File> {
    const file = await this.findOne({
      where: { id },
      relations : {
        author : true,
        expense : true,
        vehicle : true,
        company : true
      }
    });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
