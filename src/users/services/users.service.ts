import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDTO } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const createdUser = new this.userModel(createUserDto);
    const hashPwd = await bcrypt.hash(createdUser.password, 10);
    createdUser.password = hashPwd;
    const model = await createdUser.save();
    const { password, ...result } = model.toJSON();
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async getUserByID(userId: string) {
    const user = await this.findOne(userId);
    return {
      user,
    };
  }
}
