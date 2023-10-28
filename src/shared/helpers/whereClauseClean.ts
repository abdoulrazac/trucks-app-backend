import { Like } from 'typeorm';

export const whereClauseClean = (where = {}) => {
  const whereOut = {};
  for (const whereKey in where) {
    if (whereKey.slice(-2) == 'Id') {
      const whereKeySliced = whereKey.slice(0, -2);
      whereOut[whereKeySliced] = { id: where[whereKey] };
    } else {
      whereOut[whereKey] =
        whereKey.slice(-2) == 'Id'
          ? where[whereKey]
          : Like(`%${where[whereKey]}%`);
    }
  }

  return whereOut;
};
