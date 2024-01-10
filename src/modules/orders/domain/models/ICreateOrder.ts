import { IProduct } from '@modules/products/domain/models/IProduct';

export default interface ICreateOrder {
  customer_id: string;
  products: IProduct[];
}
