import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { VehicleStatsOutputDto } from '../dtos/vehicle-stats-output.dto';
import { Vehicle } from '../entities/vehicle.entity';

@Injectable()
export class VehicleRepository extends Repository<Vehicle> {
  constructor(private dataSource: DataSource) {
    super(Vehicle, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Vehicle> {
    const vehicle = await this.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException();
    }
    return vehicle;
  }

  async getStatisticsById(id: number): Promise<any> {
    // Breakdowns by month and type for the last 12 months
    const breakdownByMonthAndType = await this.dataSource.query(`
    SELECT
        DATE_FORMAT(occurredAt, '%Y-%m') AS month,
        type,
        COUNT(*) AS count
    FROM
        breakdowns
    WHERE
        occurredAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) AND vehicleId = ${id}
    GROUP BY
        month,
        type
    ORDER BY
        month DESC,
        type;
    `);

    // Count of breakdowns
    const breakdownCount = await this.dataSource.query(`
    SELECT
        COUNT(*) AS count
    FROM
        breakdowns
    WHERE
        vehicleId = ${id};
    `);

    // Count of files
    const fileCount = await this.dataSource.query(`
    SELECT
        COUNT(*) AS count
    FROM
        files
    WHERE
        vehicleId = ${id};
    `);

    // Last file with category assurance
    const lastInsurance = await this.dataSource.query(`
    SELECT
        *
    FROM
        files
    WHERE
        vehicleId = ${id} AND (categories LIKE '%assurance%' OR label LIKE '%assurance%')
    ORDER BY
        createdAt DESC
    LIMIT 1;
    `);

    // Last file with category technical visit
    const lastCcva = await this.dataSource.query(`
    SELECT
        *
    FROM
        files
    WHERE
        vehicleId = ${id} AND (categories LIKE '%ccva%' OR label LIKE '%ccva%')
    ORDER BY
        createdAt DESC
    LIMIT 1;
    `);


    return {
      breakdownByMonthAndType,
      breakdownCount : breakdownCount[0].count,
      fileCount : fileCount[0].count,
      lastInsurance: lastInsurance[0],
      lastCcva: lastCcva[0],
    };
  }
}
