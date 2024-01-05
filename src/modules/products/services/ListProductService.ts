import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const redisCache = new RedisCache();

    const products = await productsRepository.find();

    await redisCache.save('teste', 'teste');

    return products;
  }
}

export default ListProductService;
