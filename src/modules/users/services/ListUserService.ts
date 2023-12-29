import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import Product from '../typeorm/entities/User';

class ListUserService {
  public async execute(): Promise<Product[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
