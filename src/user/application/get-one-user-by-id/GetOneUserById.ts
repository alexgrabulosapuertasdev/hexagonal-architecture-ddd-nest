import { Injectable } from '@nestjs/common';
import { GetUserResponse } from './GetUserResponse';
import { UserRepository } from '../../domain/UserRepository';
import { NotFound } from '../../../shared/domain/exceptions/NotFound';

@Injectable()
export class GetOneUserById {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<GetUserResponse> {
    const user = await this.repository.getOneById(id);

    if (!user) {
      throw new NotFound('There is no user with this id');
    }

    const { password, ...result } = user.toPrimitives();
    return result;
  }
}
