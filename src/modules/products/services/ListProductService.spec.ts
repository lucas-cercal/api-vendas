import 'reflect-metadata';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import ListProductService from './ListProductService';
import { IProduct } from '../domain/models/IProduct';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let listCustomer: ListProductService;
let productCreated: IProduct;

describe('List products', () => {
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    listCustomer = new ListProductService(fakeProductsRepository);

    productCreated = await createProduct.execute({
      name: 'Calça Jeans',
      price: 179.99,
      quantity: 10,
    });
  });

  it('Should be able to list products', async () => {
    const products = await listCustomer.execute();

    expect(products).toContain(productCreated);
  });
});
