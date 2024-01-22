import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.model';
import { AuthGuard } from 'src/auth/auth.guard';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  providers: [AuthGuard, UserResolver, UserService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
