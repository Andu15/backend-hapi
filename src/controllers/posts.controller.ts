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
import { PostsService } from 'src/services/posts.service';
import { CreatePostDTO } from '../dto/post.dto';
import { ApiKeyGuard } from '../guard/api-key.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // METODO POST: API de creación de posts con los campos de título, descripción e imagen estando el usuario ya autenticado
  @UseGuards(ApiKeyGuard)
  @Post()
  async createPost(@Body() createPostDTO: CreatePostDTO) {
    const post = await this.postsService.create(createPostDTO);
    return {
      message: 'the post was successfully created',
      post,
    };
  }

  // METODO GET: API de listado de posts  --TERMINADO!
  @Get()
  async getList() {
    return this.postsService.findAll();
  }

  // METODO DELETE: API para la eliminación de un post, en caso el mismo pertenezca al usuario autenticado
  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return {
      message: `Post with id ${id} has been successfully removed`,
    };
  }

  // METODO PUT: API que permita, al usuario autenticado, votar o quitar el voto dado a un post
  @UseGuards(ApiKeyGuard)
  @Patch(':id')
  updatePost(@Param('id') id: string) {
    return {
      message: `The post with id ${id} has been updated successfully`,
    };
  }
}
