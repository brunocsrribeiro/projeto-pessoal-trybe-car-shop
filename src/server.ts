import CustomRouter from './routes/Routes';
import CarController from './controllers/carController';
import { Car } from './interfaces/CarInterface';
import App from './app';

const server = new App();

const carRouter = new CustomRouter<Car>();

const carController = new CarController();
carRouter.addRouter(carController);

server.addRouter(carRouter.router);

server.startServer();

export default server;