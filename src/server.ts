import CustomRouter from './routes/Routes';
import CarController from './controllers/carController';
import MotorcycleController from './controllers/motorcycleController';
import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import App from './app';

const server = new App();

const carRouter = new CustomRouter<Car>();
const motorcycleRouter = new CustomRouter<Motorcycle>();

const carController = new CarController();
const motorcycleController = new MotorcycleController();
carRouter.addRouter(carController);
motorcycleRouter.addRouter(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

server.startServer();

export default server;