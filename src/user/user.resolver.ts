import { Resolver, Mutation, Args, Int, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto';
import { User } from './entities';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
@Injectable()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(AuthGuard)
    private readonly authGuard: AuthGuard,
    private readonly userService: UserService,
  ) {}

  @Query(() => [User], { name: 'getUsersByGroup' })
  getAllUsersByGroup(@Args('groupId', { type: () => Int }) groupId: number) {
    return this.userService.findAll({ groupId });
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  async user(
    @Args('email', { type: () => String }) email: string,
    @Context() context: any,
  ) {
    const { userId } = context.req;
    const user = await this.userService.findOne({ email });
    if (user.id !== userId) {
      throw new Error('You do not have permission to access this resource');
    }
    return user;
  }

  @Mutation(() => String)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }
}
