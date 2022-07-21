import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Repository } from 'typeorm';

import CreateUserInput from './dto/create-user.input';
import UpdateUserInput from './dto/update-user.input';
import User from './entities/user.entity';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { email } = createUserInput;
    return this.userRepo.save({
      email,
    });
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(uuid: string) {
    return this.userRepo.findOneBy({ uuid });
  }

  async update(uuid: string, updateUserInput: UpdateUserInput): Promise<any> {
    const result = await this.userRepo
      .createQueryBuilder()
      .update(User)
      .set(updateUserInput)
      .where({ uuid })
      .returning('*')
      .execute();
    return result.raw[0]
      ? _.mapKeys(result.raw[0], (_v: any, k: any) => _.camelCase(k))
      : null;
  }

  async remove(uuid: string) {
    const result = await this.userRepo.delete(uuid);
    return result.affected;
  }
}
