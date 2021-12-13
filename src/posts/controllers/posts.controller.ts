import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostsService } from '../services/posts.service';
import { CreatePostDTO } from '../dtos/post.dto';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { Public } from '../../auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // METODO POST: API de creación de posts con los campos de título, descripción e imagen estando el usuario ya autenticado
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() createPostDTO: CreatePostDTO) {
    const post = await this.postsService.create(createPostDTO);
    return {
      message: 'the post was successfully created',
      post,
    };
  }

  // METODO GET: API de listado de posts
  @Public()
  @Get()
  async getList() {
    return this.postsService.findAll();
  }

  // METODO DELETE: API para la eliminación de un post, en caso el mismo pertenezca al usuario autenticado
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return {
      message: `Post with id ${id} has been successfully removed`,
    };
  }

  // METODO PATCH: API que permita, al usuario autenticado, votar o quitar el voto dado a un post
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updatePost(@Param('id') id: string) {
    return this.postsService.findAll();
    // return {
    //   message: `The post with id ${id} has been updated successfully`,
    // };
  }
}
