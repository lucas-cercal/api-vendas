import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import ShowCustomerService from './ShowCustomerService';
import { ICustomer } from '../domain/models/ICustomer';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;
let showCustomer: ShowCustomerService;
let customerCreated: ICustomer;

describe('Show customer', () => {
  beforeEach(async () => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
    showCustomer = new ShowCustomerService(fakeCustomersRepository);

    customerCreated = await createCustomer.execute({
      name: 'Lucas Cercal',
      email: 'teste@teste.com',
    });
  });

  it('Should be able to show a customer', async () => {
    const customer = await showCustomer.execute({
      id: customerCreated.id,
    });

    expect(customer).toEqual(customerCreated);
  });

  it('Should not be possible to show a customer if it does not exist', async () => {
    expect(
      showCustomer.execute({
        id: '8b0faf16-a8a0-4212-a2a5-2547de606b45',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
