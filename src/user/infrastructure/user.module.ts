import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserCreator } from '../application/user-creator/UserCreator';
import { UserRepository } from '../domain/UserRepository';
import { TypeOrmUserRepository } from './persistence/TypeOrmUserRepository';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUser } from './persistence/typeorm/TypeOrmUser';
import { GetAllUsers } from '../application/get-all-users/GetAllUsers';
import { GetOneUserById } from '../application/get-one-user-by-id/GetOneUserById';
import { UpdateUser } from '../application/update-user/UpdateUser';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUser])],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: TypeOrmUserRepository },
    UserCreator,
    GetAllUsers,
    GetOneUserById,
    UpdateUser,
  ],
})
export class UserModule {}
