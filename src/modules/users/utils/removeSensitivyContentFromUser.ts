import User from '../typeorm/entities/User';

export const removeSensitivyContentFromUser = ({
  password,
  ...user
}: User): Partial<User> => user;
