import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUser: CreateUserDto) {
    const user = await this.userModel.findOne({
      where: { email: createUser.email },
    });

    if (user) {
      return 'Email already exists';
    }
    const saltOrRounds = 10;
    const password = createUser.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    this.userModel.create({
      name: createUser.name,
      email: createUser.email,
      password: hash,
    });
    return 'User created successfully';
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: { email: email },
    });
  }
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({
      where: { email: email },
    });

    if (!user) {
      return 'Email does not exist';
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return 'Wrong password';
    }

    return 'Logged in successfully';
  }
}
