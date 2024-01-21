import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { Task, TaskFollow } from './task.model';
import { User } from 'src/user/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  providers: [TaskResolver, TaskService, UserService],
  imports: [
    SequelizeModule.forFeature([Task, User, TaskFollow]),
    CacheModule.register(),
  ],
})
export class TaskModule {}
