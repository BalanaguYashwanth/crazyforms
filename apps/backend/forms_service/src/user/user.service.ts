import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const data = await this.userRepository.findOne({
      where: { email: createUserDto?.email },
    });
    if (!data) {
      const userData = await this.userRepository.insert(createUserDto);
      return userData?.generatedMaps[0];
    }
    return data;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} ${updateUserDto} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
