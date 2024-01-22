import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  startTime?: string;
  @Field({ nullable: true })
  dueTime?: string;
  @Field({ nullable: true })
  parentId?: number;
  @Field(() => Int)
  creatorId: number;
  @Field(() => Int)
  groupId: number;
}

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  startTime?: string;
  @Field({ nullable: true })
  assigneeId?: number;
  @Field({ nullable: true })
  followerId?: number;
  @Field({ nullable: true })
  dueTime?: string;
  @Field(() => Int, { nullable: true })
  status?: number;
}

@InputType()
export class FollowTaskInput {
  @Field(() => Int)
  taskId: number;
  @Field(() => Int)
  userId: number;
}
