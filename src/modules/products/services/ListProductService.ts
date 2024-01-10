import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import redisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);

    let products = await redisCache.recover<Product[]>(
      `${process.env.REDIS_KEY}`,
    );

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save(`${process.env.REDIS_KEY}`, products);
    }

    return products;
  }
}

export default ListProductService;
