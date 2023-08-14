import { Injectable } from '@nestjs/common';
import { UserUpdateRequest } from './UserUpdateRequest';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

@Injectable()
export class UpdateUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(request: UserUpdateRequest): Promise<void> {
    const user = User.create(request);
    await this.repository.save(user);
  }
}
