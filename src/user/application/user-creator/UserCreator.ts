import { Injectable } from '@nestjs/common';
import { UserCreatorRequest } from './UserCreatorRequest';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

@Injectable()
export class UserCreator {
  constructor(private readonly repository: UserRepository) {}

  async execute(request: UserCreatorRequest): Promise<void> {
    const user = User.create(request);
    await this.repository.save(user);
  }
}
