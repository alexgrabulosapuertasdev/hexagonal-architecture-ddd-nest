import { MockProxy, mock } from 'jest-mock-extended';
import { DeleteUser } from './DeleteUser';
import { UserRepository } from '../../domain/UserRepository';
import { UserIdMother } from '../../../../test/user/domain/UserIdMother';

describe('DeleteUser', () => {
  let mockRepository: MockProxy<UserRepository>;
  let SUT: DeleteUser;

  beforeEach(() => {
    mockRepository = mock();
    SUT = new DeleteUser(mockRepository);
  });

  it('should delete a user by id sent', async () => {
    const id = UserIdMother.create().value;

    await SUT.execute(id);
    expect(mockRepository.delete).toBeCalledWith(id);
  });
});
