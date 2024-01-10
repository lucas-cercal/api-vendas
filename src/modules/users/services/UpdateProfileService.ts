import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<Partial<User>> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found.');

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id)
      throw new AppError('There is already one user with this email.');

    if (password && !old_password)
      throw new AppError('Old password is required');

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) throw new AppError('Old password does not match.');

      const checkNowPassword = await compare(password, user.password);

      if (checkNowPassword)
        throw new AppError('This password has already been used.');

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
