import { InvalidArgument } from '../../shared/domain/exceptions/InvalidArguments';

export class UserPassword {
  constructor(readonly value: string) {
    this.ensurePasswordIsValid(value);
  }

  private ensurePasswordIsValid(value: string): void {
    if (!value) {
      throw new InvalidArgument(`${this.constructor.name} is required`);
    }
  }
}
