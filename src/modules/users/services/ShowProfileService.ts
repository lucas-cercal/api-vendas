import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { removeSensitivyContentFromUser } from '../utils/removeSensitivyContentFromUser';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<Partial<User>> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found.');

    return removeSensitivyContentFromUser(user);
  }
}

export default ShowProfileService;
