import { MockProxy, mock } from 'jest-mock-extended';
import { UpdateUser } from './UpdateUser';
import { UserUpdateRequest } from './UserUpdateRequest';
import { UserRepository } from '../../domain/UserRepository';
import { InvalidArgument } from '../../../shared/domain/exceptions/InvalidArguments';
import { UserMother } from '../../../../test/user/domain/UserMother';

describe('UpdateUser', () => {
  let mockRepository: MockProxy<UserRepository>;
  let SUT: UpdateUser;

  beforeEach(() => {
    mockRepository = mock();
    SUT = new UpdateUser(mockRepository);
  });

  it('should update a user without throwing errors when all data is valid', () => {
    const user = UserMother.create();

    const request: UserUpdateRequest = {
      ...user.toPrimitives(),
    };

    expect(SUT.execute(request)).resolves.not.toThrow();
    expect(mockRepository.save).toBeCalledWith(UserMother.create(request));
  });

  it('should throws an error when updating a user with an invalid uuid', () => {
    const user = UserMother.create();

    const invalidId = 'invalid';

    const request: UserUpdateRequest = {
      ...user.toPrimitives(),
      id: invalidId,
    };

    expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should throws an error when creating a user with an invalid name', () => {
    const user = UserMother.create();

    const request: UserUpdateRequest = {
      ...user.toPrimitives(),
      name: '',
    };

    expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should throws an error when creating a user with an invalid email', () => {
    const user = UserMother.create();

    const invalidEmail = 'invalid';

    const request: UserUpdateRequest = {
      ...user.toPrimitives(),
      email: invalidEmail,
    };

    expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should throws an error when creating a user with an invalid password', () => {
    const user = UserMother.create();

    const request: UserUpdateRequest = {
      ...user.toPrimitives(),
      password: '',
    };

    expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});
