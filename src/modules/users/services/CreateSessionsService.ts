import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../typeorm/entities/User';
import authConfig from '@config/auth';
import { removeSensitivyContentFromUser } from '../utils/removeSensitivyContentFromUser';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  userUpdated: Partial<User>;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfimed = await compare(password, user.password);

    if (!passwordConfimed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const userUpdated = removeSensitivyContentFromUser(user);

    return {
      userUpdated,
      token,
    };
  }
}

export default CreateSessionsService;
