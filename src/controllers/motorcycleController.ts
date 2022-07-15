import { Response, Request } from 'express';
import Controller from '.';
import { RequestWithBody, ResError } from '../interfaces/errorInterface';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleService from '../services/motorcycleService';

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
      const motorcycle = await this.service.create(req.body);

      if ('error' in motorcycle) {
        return res.status(400).json({ error: motorcycle.error });
      }

      return res.status(201).json(motorcycle);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request<Motorcycle>,
    res: Response<Motorcycle[] | ResError | null>,
  ): Promise<typeof res> => {
    try {
      const motorcycle = await this.service.read();
      return res.status(200).json(motorcycle);
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

      const result = await this.service.readOne(id);

      if (!result) return res.status(404).json({ error: this.errors.notFound });

      return res.status(200).json(result);
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

      const rst = await this.service.update(id, req.body);

      if (!rst) return res.status(404).json({ error: this.errors.notFound });

      if ('error' in rst) return res.status(400).json({ error: rst.error });

      return res.status(200).json(rst);
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
