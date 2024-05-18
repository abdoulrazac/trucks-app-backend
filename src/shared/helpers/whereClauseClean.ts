import { IsNull, Like, Not } from 'typeorm';

export const whereClauseClean = (where = {}) => {
  const whereOut = {};
  for (const whereKey in where) {
    if (whereKey.slice(-6) == "IsNull") {
      const whereKeySliced = whereKey.slice(-8, -6) == 'Id' ? whereKey.slice(0, -8) : whereKey.slice(0, -6);
      const whereKeyValue = where[whereKey] == "true" ? IsNull() : Not(IsNull());
      whereOut[whereKeySliced] = whereKey.slice(-8, -6) == 'Id' ? { id: whereKeyValue } : whereKeyValue;
    } else if (whereKey.slice(-2) == 'Id') {
      const whereKeySliced = whereKey.slice(0, -2);
      whereOut[whereKeySliced] = { id: where[whereKey] };
    } else if(typeof where[whereKey] === 'boolean') {
      whereOut[whereKey] = where[whereKey];
    } else {
      whereOut[whereKey] =  Like(`%${where[whereKey]}%`);
    }
  }

  return whereOut;
};
