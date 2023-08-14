import { User } from './User';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract getAll(): Promise<User[]>;
  abstract getOneById(id: string): Promise<User | undefined>;
  abstract delete(id: string): Promise<void>;
}
