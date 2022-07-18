import { expect } from 'chai';
import Sinon, { SinonStub } from 'sinon';
import { Car } from '../../../interfaces/CarInterface';
import CarService from '../../../services/carService';
import { errorCar, validAllCars, validCar } from '../../mocks/vehiclesMocks';

describe('Car service', async () => {
  const carService = new CarService();

  describe("Test of Services", async () => {

    before(async ()=> {
      Sinon.stub(carService.model, 'create').resolves(validCar);
      Sinon.stub(carService.model, 'read').resolves(validAllCars);
      Sinon.stub(carService.model, 'readOne').resolves(validCar);
      Sinon.stub(carService.model, 'update').resolves(validCar);
      Sinon.stub(carService.model, 'delete').resolves({} as Car);
    });

    after(() => {
      (carService.model.create as SinonStub).restore();
    });

    it('Create success', async () => {
      const carCreated = await carService.create(validCar);

      expect(carCreated).to.be.deep.equal(validCar);
    });

    it('Read success', async () => {
      const carRead = await carService.read();

      expect(carRead).to.be.deep.equal(validAllCars);
    });

    it('ReadOne success', async () => {
      const carReadOne =await carService.readOne(validCar._id);

      expect(carReadOne).to.be.deep.equal(validAllCars[0]);
    });

    it('Update success', async () => {
      const carUpdate = await carService.update(validCar._id, validCar);

      expect(carUpdate).to.be.deep.equal(validCar);
    });

    it('Delete success', async () => {
      const carDelete = await carService.delete(validCar._id);

      expect(carDelete).to.be.deep.equal({});
    });

    it('Create test error', async () => {
      const carCreated = await carService.create(errorCar as unknown as Car);

      expect(carCreated).to.haveOwnProperty('error');
    });

    it('Create test error', async () => {
      const carCreated = await carService.update(errorCar._id, errorCar as unknown as Car);

      expect(carCreated).to.haveOwnProperty('error');
    })
  });
});
