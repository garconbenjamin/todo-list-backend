import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUser: CreateUserInput) {
    const user = await this.userModel.findOne({
      where: { email: createUser.email },
    });

    if (user) {
      throw new HttpException('Email already exists', 400);
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
  async findOne(where: Partial<User>): Promise<User | undefined> {
    return this.userModel.findOne({
      where,
    });
  }
  async findAll(where: Partial<User>) {
    return this.userModel.findAll({
      where,
    });
  }
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({
      where: { email },
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
