import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import UpdateCustomerService from './UpdateCustomerService';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomer: UpdateCustomerService;
let createCustomer: CreateCustomerService;
let customerCreated: ICustomer;

describe('Update customer', () => {
  beforeEach(async () => {
    fakeCustomersRepository = new FakeCustomersRepository();
    updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
    createCustomer = new CreateCustomerService(fakeCustomersRepository);

    customerCreated = await createCustomer.execute({
      name: 'Lucas Cercal',
      email: 'teste@teste.com',
    });
  });

  it('Should be able to update a customer', async () => {
    const customer = await updateCustomer.execute({
      id: customerCreated.id,
      name: 'Teste Teste',
      email: 'teste2@teste.com',
    });

    expect(customer).toEqual(customer);
  });

  it('Should not be able to update if there is no customer', async () => {
    expect(
      updateCustomer.execute({
        id: '8b0faf16-a8a0-4212-a2a5-2547de606b45',
        name: 'Teste',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be possible to update if there is already another customer with the same email', async () => {
    await createCustomer.execute({
      name: 'Teste Teste',
      email: 'teste3@teste.com',
    });

    expect(
      updateCustomer.execute({
        id: customerCreated.id,
        name: 'Teste',
        email: 'teste3@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
