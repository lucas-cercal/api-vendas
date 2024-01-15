import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('Create customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('Should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Lucas Cercal',
      email: 'teste@teste.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Should not be able to create two customer with same email', async () => {
    await createCustomer.execute({
      name: 'Lucas Cercal',
      email: 'teste@teste.com',
    });

    expect(
      createCustomer.execute({
        name: 'Lucas Cercal',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
