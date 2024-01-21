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
  dueTime?: string;
}

@InputType()
export class AssignTaskInput {
  @Field(() => Int)
  taskId: number;
  @Field(() => Int)
  userId: number;
}

@InputType()
export class FollowTaskInput extends AssignTaskInput {}
