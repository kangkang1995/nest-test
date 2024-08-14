import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { md5 } from 'src/utils/utils';

@Injectable()
export class UserService {
  /** 日志 */
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  /**
   * 注册
   */

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      userName: user.userName,
    });

    if (foundUser) {
      throw new HttpException('用户已存在', 200);
    }

    const newUser = new User();
    newUser.userName = user.userName;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  /**
   * 登录
   */
  async login(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      userName: user.userName,
    });

    if (!foundUser) {
      throw new HttpException('用户不存在', 200);
    }

    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }

    return foundUser;
  }
}
