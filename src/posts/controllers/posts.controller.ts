import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostsService } from '../services/posts.service';
import { CreatePostDTO } from '../dtos/post.dto';
import { Public } from '../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthService } from '../../auth/services/auth.service';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private authService: AuthService,
  ) {}

  // METODO POST: API de creación de posts con los campos de título, descripción e imagen estando el usuario ya autenticado
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() createPostDTO: CreatePostDTO, @Request() req: any) {
    const post = await this.postsService.create(createPostDTO);
    const email = req.user.name;
    return {
      message: 'the post was successfully created',
      post,
      email,
    };
  }

  // METODO GET: API de listado de posts
  @Public()
  @Get()
  async getList() {
    return this.postsService.findAll();
  }

  // METODO DELETE: API para la eliminación de un post, en caso el mismo pertenezca al usuario autenticado
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deletePost(@Param('id') id: string, @Request() req: any) {
    // respuesta de la data de posts
    // const emailUser = req.user.name;
    // respuesta de la data de auth
    // condicional que el usuario que entra le corresponde el post:
    // if () {}
    return this.postsService.remove(id);
  }

  // METODO PATCH: API que permita, al usuario autenticado, votar o quitar el voto dado a un post
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() createPostDTO: CreatePostDTO) {
    return this.postsService.update(id, createPostDTO);
  }
}
