import { UserUpdateRequest } from '../../application/update-user/UserUpdateRequest';

export type UpdateUserDto = Omit<UserUpdateRequest, 'id'>;
