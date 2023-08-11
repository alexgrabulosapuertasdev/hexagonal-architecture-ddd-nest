import { UserCreatorRequest } from '../../application/user-creator/UserCreatorRequest';

export type CreateUserDto = Omit<UserCreatorRequest, 'id'>;
