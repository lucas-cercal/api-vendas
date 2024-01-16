import { v4 as uuidv4 } from 'uuid';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { ICreateProduct } from '../../models/ICreateProduct';
import { IProductsRepository } from '../IProductsRepository';

export default class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = new Product();

    product.id = uuidv4();
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    this.products.push(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }

  public async remove(product: Product): Promise<void> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );

    if (findIndex !== -1) {
      this.products.splice(findIndex, 1);
    }
  }

  public async findAll(): Promise<Product[] | undefined> {
    return this.products;
  }

  public async findAllByIds(): Promise<Product[] | undefined> {
    return this.products;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.name === name);

    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.id === id);

    return product;
  }

  public async updateStock() {
    return;
  }
}
