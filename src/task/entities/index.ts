import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities';

@ObjectType()
export class Task {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  startTime?: string;

  @Field({ nullable: true })
  dueTime?: string;

  @Field({ nullable: true })
  creatorId?: number;

  @Field({ nullable: true })
  assigneeId?: number;

  @Field({ nullable: true })
  groupId?: number;

  @Field({ nullable: true })
  parentId?: number;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field({ nullable: true })
  creator?: User;

  @Field(() => [TaskFollower], { nullable: true })
  followers?: TaskFollower[];

  @Field(() => User, { nullable: true })
  assignee?: User;
}

@ObjectType()
export class TaskFollower {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  taskId: number;

  @Field({ nullable: true })
  userId: number;

  @Field({ nullable: true })
  createdAt: string;

  @Field({ nullable: true })
  updatedAt: string;
}
