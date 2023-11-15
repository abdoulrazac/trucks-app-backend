import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

import {Truck} from "../entities/truck.entity";

@Injectable()
export class TruckRepository extends Repository<Truck>{

  constructor(private dataSource: DataSource) {
    super(Truck, dataSource.createEntityManager());
  }


  /**
   * Retrieves a truck by its ID.
   *
   * Description : This code defines an asynchronous
   * function named getById that takes an id parameter
   * of type number and returns a promise that resolves
   * to a Truck object. Inside the function, it uses
   * the findOne method to find a truck based on the
   * provided id, including related entities such as
   * conductor, tractor, and semiTrailer. If no truck
   * is found, it throws a NotFoundException.
   * Finally, it returns the found truck.
   *
   * @param {number} id - The ID of the truck to retrieve.
   * @return {Promise<Truck>} A promise that resolves to the truck with the specified ID.
   * @throws {NotFoundException} If no truck is found with the specified ID.
   */
  async getById(id: number): Promise<Truck> {
    const truck = await this.findOne({
      where: { id },
      relations : {
        conductor : true,
        tractor : true,
        semiTrailer : true
      }});
    if (!truck) {
      throw new NotFoundException();
    }
    return truck;
  }
}
