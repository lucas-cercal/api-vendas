import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { removeSensitivyContentFromUser } from '../utils/removeSensitivyContentFromUser';

class ListUserService {
  public async execute(): Promise<Partial<User>[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();

    const usersWithoutPassword = users.map(user =>
      removeSensitivyContentFromUser(user),
    );

    return usersWithoutPassword;
  }
}

export default ListUserService;
