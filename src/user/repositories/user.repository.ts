import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserStatsOutputDto } from '../dtos/user-stats-output.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<User> {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getStatisticsById(id: number): Promise<UserStatsOutputDto> {
    // Count travel by month for the last 12 months
    const travelByMonth = await this.dataSource.query(`
      SELECT
        DATE_FORMAT(tr.createdAt, '%Y-%m') AS month,
        COUNT(*) AS count
      FROM db_3tb_trucks.trucks t 
        LEFT JOIN db_3tb_trucks.travels tr 
        ON t.id = tr.truckId 
      WHERE tr.createdAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) AND t.conductorId = ${id}
      GROUP BY
          month
      ORDER BY
          month ASC;
    `);

    // Travel count
    const travelCount = await this.dataSource.query(`
      SELECT
        COUNT(*) AS count
      FROM db_3tb_trucks.trucks t 
        LEFT JOIN db_3tb_trucks.travels tr 
        ON t.id = tr.truckId 
      WHERE t.conductorId = ${id}
    `);

    // Count of files
    const fileCount = await this.dataSource.query(`
      SELECT
          COUNT(*) AS count
      FROM
          files
      WHERE
          authorId = ${id};
    `);

    const lastContract = await this.dataSource.query(`
      SELECT
          *
      FROM
          contracts
      WHERE
          authorId = ${id}
      ORDER BY
          createdAt DESC
      LIMIT 1;
    `);

    return {
      travelByMonth,
      travelCount: travelCount[0].count,
      fileCount: fileCount[0].count,
      lastContract: lastContract[0],
    };
  }
}
