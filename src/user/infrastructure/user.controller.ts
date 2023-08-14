import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserCreator } from '../application/user-creator/UserCreator';
import { GetAllUsers } from '../application/get-all-users/GetAllUsers';
import { CreateUserDto } from './dto/create-user.dto';
import { UserId } from '../domain/UserId';
import { UserResponseDto } from './dto/user-response.dto';
import { GetOneUserById } from '../application/get-one-user-by-id/GetOneUserById';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userCreator: UserCreator,
    private readonly getAllUsers: GetAllUsers,
    private readonly getOneUserById: GetOneUserById,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been succesfully created',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userCreator.execute({
      ...createUserDto,
      id: UserId.random().value,
    });
  }

  @Get()
  @ApiOkResponse({ type: [UserResponseDto] })
  findAll(): Promise<UserResponseDto[]> {
    return this.getAllUsers.execute();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto })
  findOneById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.getOneUserById.execute(id);
  }
}
