import { Response, Request } from 'express';
import Controller from '.';
import CarService from '../services/carService';
import { Car } from '../interfaces/CarInterface';
import { RequestWithBody, ResError } from '../interfaces/errorInterface';

export default class CarController extends Controller<Car> {
  $route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResError | null>,
  ): Promise<typeof res> => {
    try {
      const car = await this.service.create(req.body);

      if ('error' in car) return res.status(400).json({ error: car.error });

      return res.status(201).json(car);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request<Car>,
    res: Response<Car[] | ResError | null>,
  ): Promise<typeof res> => {
    try {
      const car = await this.service.read();
      return res.status(200).json(car);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResError | null>,
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
    req: RequestWithBody<Car>,
    res: Response<Car | ResError | null>,
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
    res: Response<Car | ResError | null>,
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
