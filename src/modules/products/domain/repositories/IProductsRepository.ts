import { IProduct } from '../models/IProduct';

interface IFindProducts {
  id: string;
}

export default interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
}