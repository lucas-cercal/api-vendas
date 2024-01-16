import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('Create product', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('Should be able to create a new product', async () => {
    const product = await createProduct.execute({
      name: 'Calça Jeans',
      price: 179.99,
      quantity: 10,
    });

    expect(product).toHaveProperty('id');
  });

  it('Should not be able to create two products with same name', async () => {
    await createProduct.execute({
      name: 'Calça Jeans',
      price: 179.99,
      quantity: 10,
    });

    expect(
      createProduct.execute({
        name: 'Calça Jeans',
        price: 179.99,
        quantity: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
