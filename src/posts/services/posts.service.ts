import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Post, PostDocument } from '../schemas/post.schema';
import { CreatePostDTO } from '../dtos/post.dto';
import { AuthService } from '../../auth/services/auth.service';
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private authService: AuthService,
  ) {}

  async create(createPostDto: CreatePostDTO): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  update(id: string, createPostDto: CreatePostDTO) {
    const post = this.postModel
      .findByIdAndUpdate(id, { $set: createPostDto }, { new: true })
      .exec();
    if (!post) {
      throw new NotFoundException(`post with #${id} not found`);
    }
    return post;
  }

  remove(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }
}
