import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';

interface Primitives {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  constructor(
    readonly id: UserId,
    readonly name: UserName,
    readonly email: UserEmail,
    readonly password: UserPassword,
  ) {}

  static create(params: Primitives): User {
    const { id, name, email, password } = params;

    return new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserPassword(password),
    );
  }

  static fromPrimitives(data: Primitives): User {
    const { id, name, email, password } = data;

    return new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserPassword(password),
    );
  }

  toPrimitives(): Primitives {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    };
  }
}
