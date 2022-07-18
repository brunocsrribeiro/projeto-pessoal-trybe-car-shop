// import { expect } from 'chai';
// import Sinon, { SinonStub } from 'sinon';
// import { Car } from '../../../interfaces/CarInterface';
// import CarService from '../../../services/carService';
// import { errorCar, validAllCars, validCar } from '../../mocks/vehiclesMocks';

// describe('Car Controller', async () => {
//   const carController = new CarService();

//   describe("Test of Controller", async () => {

//     before(async ()=> {
//       Sinon.stub(carController.model, 'create').resolves(validCar);
//       Sinon.stub(carController.model, 'read').resolves(validAllCars);
//       Sinon.stub(carController.model, 'readOne').resolves(validCar);
//       Sinon.stub(carController.model, 'update').resolves(validCar);
//       Sinon.stub(carController.model, 'delete').resolves({} as Car);
//     });

//     after(() => {
//       (carController.model.create as SinonStub).restore();
//     });

//     it('Create success', async () => {
//       const carCreated = await carController.create(validCar);

//       expect(carCreated).to.be.deep.equal(validCar);
//     });

//     it('Read success', async () => {
//       const carRead = await carController.read();

//       expect(carRead).to.be.deep.equal(validAllCars);
//     });

//     it('ReadOne success', async () => {
//       const carReadOne =await carController.readOne(validCar._id);

//       expect(carReadOne).to.be.deep.equal(validAllCars[0]);
//     });

//     it('Update success', async () => {
//       const carUpdate = await carController.update(validCar._id, validCar);

//       expect(carUpdate).to.be.deep.equal(validCar);
//     });

//     it('Delete success', async () => {
//       const carDelete = await carController.delete(validCar._id);

//       expect(carDelete).to.be.deep.equal({});
//     });

//     it('Create test error', async () => {
//       const carCreated = await carController.create(errorCar as unknown as Car);

//       expect(carCreated).to.haveOwnProperty('error');
//     });

//     it('Create test error', async () => {
//       const carCreated = await carController.update(errorCar._id, errorCar as unknown as Car);

//       expect(carCreated).to.haveOwnProperty('error');
//     })
//   });
// });


// import * as sinon from 'sinon';
// import chai from 'chai';
// import chaiHttp = require('chai-http');


// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Sua descrição', () => {

//   before(async () => {
//     sinon
//       .stub()
//       .resolves();
//   });

//   after(()=>{
//     ().restore();
//   })

//   it('', async () => {});

// });
