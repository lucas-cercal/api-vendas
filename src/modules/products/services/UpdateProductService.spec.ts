import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import UpdateProductService from './UpdateProductService';
import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import { IProduct } from '../domain/models/IProduct';

let fakeProductsRepository: FakeProductsRepository;
let updateProduct: UpdateProductService;
let createProduct: CreateProductService;
let productCreated: IProduct;

describe('Update customer', () => {
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    updateProduct = new UpdateProductService(fakeProductsRepository);
    createProduct = new CreateProductService(fakeProductsRepository);

    productCreated = await createProduct.execute({
      name: 'Boné Verde',
      price: 10.1,
      quantity: 1,
    });
  });

  it('Should be able to update a customer', async () => {
    const customer = await updateProduct.execute({
      id: productCreated.id,
      name: 'Boné Verde',
      price: 10.1,
      quantity: 100,
    });

    expect(customer).toEqual(customer);
  });

  it('Should not be able to update if there is no customer', async () => {
    expect(
      updateProduct.execute({
        id: '8b0faf16-a8a0-4212-a2a5-2547de606b45',
        name: 'Boné Verde',
        price: 10.1,
        quantity: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update a customer', async () => {
    const customer = await createProduct.execute({
      name: 'Calça Jeans',
      price: 179.99,
      quantity: 100,
    });

    expect(
      updateProduct.execute({
        id: customer.id,
        name: 'Boné Verde',
        price: 19.99,
        quantity: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
