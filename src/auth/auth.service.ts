import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne({ email });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      groupId: user.groupId,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
