import { Response } from 'express';

export const isResponse = (object: any): object is Response => {
  return 'sendStatus' in object;
};
