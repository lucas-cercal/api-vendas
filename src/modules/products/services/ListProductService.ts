import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute(): Promise<IProduct[]> {
    let products = await redisCache.recover<IProduct[]>(
      `${process.env.REDIS_KEY}`,
    );

    if (!products) {
      products = await this.productsRepository.findAll();

      await redisCache.save(`${process.env.REDIS_KEY}`, products);
    }

    return products;
  }
}

export default ListProductService;
