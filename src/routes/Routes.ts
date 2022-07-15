import { Router } from 'express';
import Controller from '../controllers';

export default class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRouter(
    controller: Controller<T>,
    route: string = controller.$route,
  ) {
    this.router
      .get(route, controller.read)
      .get(`${route}/:id`, controller.readOne)
      .put(`${route}/:id`, controller.update)
      .post(route, controller.create)
      .delete(`${route}/:id`, controller.delete);
  }
}