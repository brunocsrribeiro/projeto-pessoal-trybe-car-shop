import { Request, Response } from 'express';
import Service from '../services';
import {
  CtrlrErrors,
  RequestWithBody,
  ResError } from '../interfaces/errorInterface';

export default abstract class Controler<T> {
  abstract $route: string;

  protected errors = CtrlrErrors;
  
  constructor(public service: Service<T>) {}

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResError | null>,
  ): Promise<typeof res>;

  abstract read(
    _req: Request<T>,
    res: Response<T[] | ResError | null>,
  ): Promise<typeof res>;

  abstract readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResError | null>,
  ): Promise<typeof res>;

  abstract update(
    req: Request<{ id: string }>,
    res: Response<T | ResError | null>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string }>,
    res: Response<T | ResError | null>,
  ): Promise<typeof res>;
}
