import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const userExists = await usersRepository.findByName(name);
    if (userExists) {
      throw new AppError('There is already one product with this name');
    }
    const user = usersRepository.create({
      name,
      email,
      password,
      avatar,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
