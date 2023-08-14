import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { GetAllUsers } from '../application/get-all-users/GetAllUsers';
import { GetOneUserById } from '../application/get-one-user-by-id/GetOneUserById';
import { UpdateUser } from '../application/update-user/UpdateUser';
import { UserCreator } from '../application/user-creator/UserCreator';
import { UserId } from '../domain/UserId';
import { DeleteUser } from '../application/delete-user/DeleteUser';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userCreator: UserCreator,
    private readonly getAllUsers: GetAllUsers,
    private readonly getOneUserById: GetOneUserById,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.updateUser.execute({
      ...updateUserDto,
      id,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteUser.execute(id);
  }
}
