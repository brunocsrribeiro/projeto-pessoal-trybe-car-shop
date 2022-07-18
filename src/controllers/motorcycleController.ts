import { Response, Request } from 'express';
import MotorcycleService from '../services/motorcycleService';
import Controller from '.';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import { RequestWithBody, ResError } from '../interfaces/errorInterface';

export default class CarController extends Controller<Motorcycle> {
  $route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResError | null>,
  ): Promise<typeof res> => {
    try {
      const motorcycleCreated = await this.service.create(req.body);

      if ('error' in motorcycleCreated) {
        return res.status(400).json({ error: motorcycleCreated.error });
      }

      return res.status(201).json(motorcycleCreated);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request<Motorcycle>,
    res: Response<Motorcycle[] | ResError | null>,
  ): Promise<typeof res> => {
    try {
      const getAllMotorcycles = await this.service.read();
      return res.status(200).json(getAllMotorcycles);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResError | null>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.badRequest });
      }

      const getMotorcycleById = await this.service.readOne(id);

      if (!getMotorcycleById) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(200).json(getMotorcycleById);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResError | null>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.badRequest });
      }

      const update = await this.service.update(id, req.body);

      if (!update) return res.status(404).json({ error: this.errors.notFound });

      if ('error' in update) {
        return res.status(400).json({ error: update.error });
      }

      return res.status(200).json(update);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResError | null>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.badRequest });
      }

      const Deleted = await this.service.delete(id);

      if (!Deleted) {
        return res.status(404).json({ error: this.errors.notFound });
      }

      return res.status(204).json();
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
