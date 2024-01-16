import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import DeleteCustomerService from './DeleteCustomerService';
import { ICustomer } from '../domain/models/ICustomer';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;
let deleteCustomer: DeleteCustomerService;
let customerCreated: ICustomer;

describe('Delete customer', () => {
  beforeEach(async () => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
    deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);

    customerCreated = await createCustomer.execute({
      name: 'Lucas Cercal',
      email: 'teste@teste.com',
    });
  });

  it('Should be able to delete a customer', async () => {
    const customer = await deleteCustomer.execute({
      id: customerCreated.id,
    });

    expect(customer).toBeUndefined();
  });

  it('Should not be possible to delete a customer if it does not exist', async () => {
    expect(
      deleteCustomer.execute({
        id: '8b0faf16-a8a0-4212-a2a5-2547de606b45',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
