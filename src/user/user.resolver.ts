import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto';
import { User } from './entities';
import { Injectable } from '@nestjs/common';

@Injectable()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'getUsersByGroup' })
  getAllUsersByGroup(@Args('groupId', { type: () => Int }) groupId: number) {
    return this.userService.findAll({ groupId });
  }

  @Mutation(() => String)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }
}
