import { InvalidArgument } from '../../shared/domain/exceptions/InvalidArguments';

export class UserEmail {
  private readonly regexValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  constructor(readonly value: string) {
    this.ensureEmailIsValid(value);
  }

  private ensureEmailIsValid(value: string): void {
    if (!this.regexValidator.test(value)) {
      throw new InvalidArgument(`${value} isn't a valid email`);
    }
  }
}
