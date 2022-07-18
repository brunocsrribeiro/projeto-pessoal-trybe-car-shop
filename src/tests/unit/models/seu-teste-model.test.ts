import { expect } from 'chai';
import mongoose from 'mongoose';
import CarModel from '../../../models/carModel';
import sinon, { SinonStub } from 'sinon';
import { validAllCars, validCar } from '../../mocks/vehiclesMocks';


describe('Car model', async () => {
  const carModel = new CarModel();
  describe("Test of Model Mongoose's methods", async () => {

    before(async ()=> {
      sinon.stub(mongoose.Model, 'create').resolves(validCar);
      sinon.stub(mongoose.Model, 'find').resolves(validAllCars);
      sinon.stub(mongoose.Model, 'findOne').resolves(validCar);
      sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(validCar);
      sinon.stub(mongoose.Model, 'findOneAndDelete').resolves({});
    });

    after(() => {
      (mongoose.Model.create as SinonStub).restore();
    });

    it('Create success', async () => {
      const carCreated = await carModel.create(validCar);

      expect(carCreated).to.be.deep.equal(validCar);
    });

    it('Read success', async () => {
      const carRead = await carModel.read();

      expect(carRead).to.be.deep.equal(validAllCars);
    });

    it('ReadOne success', async () => {
      const carReadOne =await carModel.readOne(validCar._id);

      expect(carReadOne).to.be.deep.equal(validCar);
    });

    it('Update success', async () => {
      const carUpdate = await carModel.update(validCar._id, validCar);

      expect(carUpdate).to.be.deep.equal(validCar);
    });

    it('Delete success', async () => {
      const carDelete = await carModel.delete(validCar._id);

      expect(carDelete).to.be.deep.equal({});
    });
  });
});
