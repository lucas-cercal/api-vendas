import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';
import ICustomersRepository from '@modules/customers/domain/repositories/ICustomersRepository';

@EntityRepository(Customer)
export default class CustomersRepository
  extends Repository<Customer>
  implements ICustomersRepository
{
  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}
