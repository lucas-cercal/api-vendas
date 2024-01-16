import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import ListCustomerService from './ListCustomerService';
import { ICustomer } from '../domain/models/ICustomer';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;
let listCustomer: ListCustomerService;
let customerCreated: ICustomer;

describe('Show customer', () => {
  beforeEach(async () => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
    listCustomer = new ListCustomerService(fakeCustomersRepository);

    customerCreated = await createCustomer.execute({
      name: 'Lucas Cercal',
      email: 'teste@teste.com',
    });
  });

  it('Should be able to show a customer', async () => {
    const customer = await listCustomer.execute();

    expect(customer).toContain(customerCreated);
  });
});
