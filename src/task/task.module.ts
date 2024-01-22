import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver, TaskLogResolver } from './task.resolver';
import { Task, TaskLog } from './task.model';
import { User } from 'src/user/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  providers: [
    AuthGuard,
    TaskResolver,
    TaskLogResolver,
    TaskService,
    UserService,
  ],
  imports: [
    SequelizeModule.forFeature([Task, User, TaskLog]),
    CacheModule.register(),
    AuthModule,
  ],
})
export class TaskModule {}
