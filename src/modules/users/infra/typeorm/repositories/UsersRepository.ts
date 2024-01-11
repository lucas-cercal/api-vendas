import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';
import IUsersRepository from '@modules/users/domain/repositories/IUsersRepository';

@EntityRepository(User)
export default class UsersRepository
  extends Repository<User>
  implements IUsersRepository
{
  public async findByName(name: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
