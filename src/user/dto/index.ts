import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities';
@InputType()
export class CreateUserInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class LoginUser extends User {
  @Field()
  token: string;
}
