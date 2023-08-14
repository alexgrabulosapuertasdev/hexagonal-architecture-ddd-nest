import { MockProxy, mock } from 'jest-mock-extended';
import { GetAllUsers } from './GetAllUsers';
import { UserRepository } from '../../domain/UserRepository';
import { UserMother } from '../../../../test/user/domain/UserMother';

describe('GetAllUsers', () => {
  let mockRepository: MockProxy<UserRepository>;
  let SUT: GetAllUsers;

  beforeEach(() => {
    mockRepository = mock();
    SUT = new GetAllUsers(mockRepository);
  });

  it('should get an empty list of users if there are no users', () => {
    mockRepository.getAll.mockResolvedValue([]);

    expect(SUT.execute()).resolves.toHaveLength(0);
  });

  it('should get two users from the list if there are two users in the database', () => {
    mockRepository.getAll.mockResolvedValue([
      UserMother.create(),
      UserMother.create(),
    ]);

    expect(SUT.execute()).resolves.toHaveLength(2);
  });

  it('should return the users without password', async () => {
    const userMock = UserMother.create();
    mockRepository.getAll.mockResolvedValue([userMock]);
    const { password, ...result } = userMock.toPrimitives();

    expect(SUT.execute()).resolves.toEqual([result]);
  });
});
