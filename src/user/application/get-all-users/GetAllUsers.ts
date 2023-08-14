import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/UserRepository';
import { GetAllUsersResponse } from './GetAllUsersResponse';

@Injectable()
export class GetAllUsers {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<GetAllUsersResponse[]> {
    const users = await this.repository.getAll();

    return users
      .map((user) => user.toPrimitives())
      .map(({ password, ...result }) => result);
  }
}
