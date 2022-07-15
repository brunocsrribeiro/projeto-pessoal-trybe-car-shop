import { Request } from 'express';
import { ZodError } from 'zod';

export interface RequestWithBody<T> extends Request {
  body: T;
}

export interface ServiceError {
  error: ZodError;
}

export type ResError = {
  error: unknown;
};

export enum CtrlrErrors {
  internal = 'Internal server error',
  notFound = 'Object not found',
  badRequest = 'Id must have 24 hexadecimal characters',
}
