import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/UserRepository';

@Injectable()
export class DeleteUser {
  constructor(private readonly repository: UserRepository) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
