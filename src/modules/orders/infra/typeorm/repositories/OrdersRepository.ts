import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import IOrdersRepository from '@modules/orders/domain/repositories/IOrdersRepository';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: ICustomer;
  products: IProduct[];
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> implements IOrdersRepository {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}

export default OrdersRepository;
