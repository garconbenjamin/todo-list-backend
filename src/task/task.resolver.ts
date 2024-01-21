import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task, TaskFollower } from './entities';
import { UserService } from 'src/user/user.service';
import {
  AssignTaskInput,
  CreateTaskInput,
  UpdateTaskInput,
  FollowTaskInput,
} from './dto';
import { Inject, UseGuards } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGuard } from 'src/auth/auth.guard';
@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    @Inject(AuthGuard)
    private readonly authGuard: AuthGuard,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @Mutation(() => String)
  assignTask(@Args('assignTaskInput') assignTaskInput: AssignTaskInput) {
    return this.taskService.assignTask(assignTaskInput);
  }

  @Mutation(() => TaskFollower)
  followTask(@Args('followTaskInput') followTaskInput: FollowTaskInput) {
    const { taskId, userId } = followTaskInput;
    return this.taskService.followTask({ taskId, userId });
  }

  @Mutation(() => String, { nullable: true })
  unfollowTask(@Args('unfollowTaskInput') followTaskInput: FollowTaskInput) {
    return this.taskService.unfollowTask(followTaskInput);
  }
  @Query(() => [Task])
  getAllTasksByGroup(@Args('groupId', { type: () => Int }) groupId: number) {
    return this.taskService.findAll({ groupId });
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    @Context() context: any,
  ) {
    const { groupId: groupIdCtx } = context.req;
    const groupId =
      updateTaskInput.groupId ||
      (await this.taskService.findOne(updateTaskInput.id))?.groupId;

    if (groupIdCtx !== groupId)
      throw new Error('You are not allowed to update this task');
    await this.taskService.update(updateTaskInput);
    return 'Task updated successfully';
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.remove(id);
  }

  //resolver types
  @ResolveField()
  async creator(@Parent() task: Task) {
    return this.userService.findOne({ id: task.creatorId });
  }
  @ResolveField()
  async assignee(@Parent() task: Task) {
    const value = await this.cacheManager.get(`user_${task.assigneeId}`);
    if (value) return value;
    const user = await this.userService.findOne({ id: task.assigneeId });
    if (user) {
      await this.cacheManager.set(`user_${user.id}`, user);
    }
    return user;
  }
  @ResolveField()
  followers(@Parent() task: Task) {
    return this.taskService.getFollowersByTaskId(task.id);
  }
}
