import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import DeleteProductService from './DeleteProductService';
import { IProduct } from '../domain/models/IProduct';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let deleteProduct: DeleteProductService;
let productCreated: IProduct;

describe('Delete product', () => {
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    deleteProduct = new DeleteProductService(fakeProductsRepository);

    productCreated = await createProduct.execute({
      name: 'Jaqueta Azul',
      price: 100.0,
      quantity: 2,
    });
  });

  it('Should be able to delete a product', async () => {
    const product = await deleteProduct.execute({
      id: productCreated.id,
    });

    expect(product).toBeUndefined();
  });

  it('Should not be possible to delete a product if it does not exist', async () => {
    expect(
      deleteProduct.execute({
        id: '8b0faf16-a8a0-4212-a2a5-2547de606b45',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
