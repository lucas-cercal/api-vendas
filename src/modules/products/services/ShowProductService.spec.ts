import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import ShowProductService from './ShowProductService';
import { IProduct } from '../domain/models/IProduct';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let showProduct: ShowProductService;
let productCreated: IProduct;

describe('Show product', () => {
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    showProduct = new ShowProductService(fakeProductsRepository);

    productCreated = await createProduct.execute({
      name: 'Calça Jeans',
      price: 179.99,
      quantity: 10,
    });
  });

  it('Should be able to show a product', async () => {
    const product = await showProduct.execute({
      id: productCreated.id,
    });

    expect(product).toEqual(productCreated);
  });

  it('Should not be possible to show a product if it does not exist', async () => {
    expect(
      showProduct.execute({
        id: '8b0faf16-a8a0-4212-a2a5-2547de606b45',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
