import { faker } from '@faker-js/faker';
import { UserPassword } from '../../../src/user/domain/UserPassword';

export class UserPasswordMother {
  static create(value?: string): UserPassword {
    return new UserPassword(value ?? faker.word.words());
  }
}
