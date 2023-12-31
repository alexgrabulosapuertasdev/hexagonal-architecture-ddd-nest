import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUser } from './persistence/typeorm/TypeOrmUser';
import { Repository } from 'typeorm';
import { User } from '../domain/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly userRepository: Repository<TypeOrmUser>,
  ) {}

  async create(user: User): Promise<void> {
    const dbUser = this.userRepository.create(user.toPrimitives());
    await this.userRepository.save(dbUser);
  }

  async findAll(): Promise<User[]> {
    const rawUsers = await this.userRepository.find();
    return rawUsers.map((rawUser) => User.fromPrimitives(rawUser));
  }

  async findOneById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });

    return user ? User.fromPrimitives(user) : undefined;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
