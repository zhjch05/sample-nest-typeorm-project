import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import CreateUserInput from './dto/create-user.input';
import UpdateUserInput from './dto/update-user.input';
import User from './entities/user.entity';
import UsersService from './users.service';

@Resolver(() => User)
export default class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('uuid', { type: () => String }) uuid: string,
  ): Promise<User> {
    return this.usersService.findOne(uuid);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.uuid, updateUserInput);
  }

  @Mutation(() => Int)
  async removeUser(@Args('uuid', { type: () => String }) uuid: string) {
    return this.usersService.remove(uuid);
  }
}
