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
import { Task, TaskLog } from './entities';
import { UserService } from 'src/user/user.service';
import { CreateTaskInput, UpdateTaskInput } from './dto';
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
    const { userId: userIdCtx, groupId: groupIdCtx } = context.req;
    const { id, ...restInput } = updateTaskInput;
    const task = await this.taskService.findOne(id);
    const groupId = updateTaskInput.groupId || task?.groupId;

    if (groupIdCtx !== groupId)
      throw new Error('You are not allowed to update this task');

    await task.update({ ...restInput, updatedBy: userIdCtx });

    await this.taskService.handleCompleteParentTask(
      task,
      updateTaskInput,
      userIdCtx,
    );

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
  follower(@Parent() task: Task) {
    return this.userService.findOne({ id: task.followerId });
  }
}
@Resolver(() => TaskLog)
export class TaskLogResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [TaskLog])
  taskLogs(@Args('taskId', { type: () => Int }) taskId: number) {
    return this.taskService.getTaskLogsByTaskId(taskId);
  }
  @ResolveField()
  async user(@Parent() taskLog: TaskLog) {
    return this.userService.findOne({ id: taskLog.userId });
  }
}
