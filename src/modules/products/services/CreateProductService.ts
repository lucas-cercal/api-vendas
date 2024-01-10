import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import redisCache from '@shared/cache/RedisCache';
import ICreateProduct from '../domain/models/ICreateProduct';

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate(`${process.env.REDIS_KEY}`);

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
