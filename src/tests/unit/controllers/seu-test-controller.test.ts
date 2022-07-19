import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, { SinonStub } from 'sinon';
import CarController from '../../../controllers/carController';
import { Car } from '../../../interfaces/CarInterface';
import { updatedCar, validAllCars, validCar } from '../../mocks/vehiclesMocks';

describe('Car Controller', async () => {
  const carController = new CarController();

  const req = {} as Request;
  let res = {} as Response;

  describe('Test of Controller routes and method Create', async () => {
    before(()=> {
      Sinon.stub(carController.service, 'create').resolves(validCar);
      res.json = Sinon.stub().returns(validCar);
      res.status = Sinon.stub().returns(res);
    });

    after(() => {
      Sinon.restore();
    });

    it('Testing the routes', async () => {
      const carRoutes = carController.route;

      expect(carRoutes).to.be.deep.equal('/cars');
    });

    it('Create success', async () => {
      req.body = validCar;

      const carCreated = await carController.create(req, res);

      expect(carCreated).to.be.deep.equal(validCar);
      Sinon.assert.calledWith(res.status as SinonStub, 201);
    });
  });

  describe('Test of Controller method Read', async () => {
    before(()=> {
      Sinon.stub(carController.service, 'read').resolves(validAllCars);
      res.json = Sinon.stub().returns(validAllCars);
      res.status = Sinon.stub().returns(res);
    });

    after(() => {
      Sinon.restore();
    });

    it('Read success', async () => {
      const carRead = await carController.read(req as any, res);

      expect(carRead).to.be.deep.equal(validAllCars)
      Sinon.assert.calledWith(res.status as SinonStub, 200);
    });
  });

  describe('Test of Controller method ReadOne', async () => {
    const req = {} as Request<{ id: string }>;

    before(()=> {
      Sinon.stub(carController.service, 'readOne').resolves(validCar);
      res.json = Sinon.stub().returns(validCar);
      res.status = Sinon.stub().returns(res);
    });

    after(() => {
      Sinon.restore();
    });

    it('ReadOne success', async () => {
      req.params = { id: "4edd40c86762e0fb12000003" };

      const carReadOne = await carController.readOne(req, res);

      expect(carReadOne).to.be.deep.equal(validCar);
      Sinon.assert.calledWith(res.status as SinonStub, 200);
    });
  });

  describe('Test of Controller method Update', async () => {
    const req = {} as Request<{ id: string }>;

    before(()=> {
      Sinon.stub(carController.service, 'update').resolves(updatedCar);
      res.json = Sinon.stub().returns(updatedCar);
      res.status = Sinon.stub().returns(res);
    });

    after(() => {
      Sinon.restore();
    });

    it('Update success', async () => {
      req.params = { id: "4edd40c86762e0fb12000003" };
      req.body = updatedCar;

      const carReadOne = await carController.update(req, res);

      expect(carReadOne).to.be.deep.equal(updatedCar);
      Sinon.assert.calledWith(res.status as SinonStub, 200);
    });
  });

  describe('Test of controller Delete', async () => {
    const req = {} as Request<{ id: string }>;

    before(async () => {
      Sinon.stub(carController.service, 'delete').resolves({} as Car);
      res.json = Sinon.stub().returns({});
      res.status = Sinon.stub().returns(res);
    });

    after(() => {
      Sinon.restore();
    });

    it('Delete', async () => {
      req.params = { id: "4edd40c86762e0fb12000003" };
  
      const carDelete = await carController.delete(req, res);
  
      expect(carDelete).to.be.deep.equal({});
      Sinon.assert.calledWith(res.status as SinonStub, 204);
    });
  });

  describe('Test of Controller method ReadOne errors', async () => {
    const req = {} as Request<{ id: string }>;

    before(()=> {
      Sinon.stub(carController.service, 'readOne').resolves(validCar);
      res.json = Sinon.stub().returns({ error: 'Id must have 24 hexadecimal characters' });
      res.status = Sinon.stub().returns(res);
    });

    after(() => {
      Sinon.restore();
    });

    it('ReadOne error', async () => {
      req.params = { id: "4edd40c86762e0fb" };

      const carReadOne = await carController.update(req, res);

      expect(carReadOne).to.haveOwnProperty('error', 'Id must have 24 hexadecimal characters');
      Sinon.assert.calledWith(res.status as SinonStub, 400);
    });
  });

  describe('Test of Controller method Update errors', async () => {
    const req = {} as Request<{ id: string }>;

    before(()=> {
      Sinon.stub(carController.service, 'update').resolves(updatedCar);
      res.json = Sinon.stub().returns({ error: 'Id must have 24 hexadecimal characters' });
      res.status = Sinon.stub().returns(res);
    });

    after(() => {
      Sinon.restore();
    });

    it('Update error', async () => {
      req.params = { id: "4edd40c86762e0fb" };
      req.body = updatedCar;

      const carUpdate = await carController.update(req, res);

      expect(carUpdate).to.haveOwnProperty('error', 'Id must have 24 hexadecimal characters');
      Sinon.assert.calledWith(res.status as SinonStub, 400);
    });
  });

  describe('Test of controller Delete errors', async () => {
    const req = {} as Request<{ id: string }>;

    before(async () => {
      Sinon.stub(carController.service, 'delete').resolves();
      res.json = Sinon.stub().returns({ error: 'Id must have 24 hexadecimal characters' });
      res.status = Sinon.stub().returns(res);
    });

    after(() => {
      Sinon.restore();
    });

    it('Delete error, Id must have 24 hexadecimal characters', async () => {
      req.params = { id: "4edd40c86762e0fb12" };
  
      const carDelete = await carController.delete(req, res);
  
      expect(carDelete).to.haveOwnProperty('error', 'Id must have 24 hexadecimal characters');
      Sinon.assert.calledWith(res.status as SinonStub, 400);
    });
  });
});
