import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { Task, TaskAssignment } from './task/task.model';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'root',
      models: [User, Task, TaskAssignment],
    }),
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
