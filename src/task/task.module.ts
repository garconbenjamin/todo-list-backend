import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task, TaskAssignment } from './task.model';
import { User } from 'src/user/user.model';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [SequelizeModule.forFeature([Task, TaskAssignment, User])],
})
export class TaskModule {}
