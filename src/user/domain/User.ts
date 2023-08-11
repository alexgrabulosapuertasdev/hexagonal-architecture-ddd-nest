import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';

interface Primitives {
  id: string;
  name: string;
  email: string;
}

export class User {
  constructor(
    readonly id: UserId,
    readonly name: UserName,
    readonly email: UserEmail,
  ) {}

  static create(params: Primitives): User {
    const { id, name, email } = params;

    return new User(new UserId(id), new UserName(name), new UserEmail(email));
  }

  static fromPrimitives(data: Primitives): User {
    const { id, name, email } = data;

    return new User(new UserId(id), new UserName(name), new UserEmail(email));
  }

  toPrimitives(): Primitives {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
    };
  }
}
