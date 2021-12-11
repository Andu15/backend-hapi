import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  // METODO POST: API de creación de posts con los campos de título, descripción e imagen estando el usuario ya autenticado
  @Post('create')
  createPost(
    @Body() newPost: { title: string; description: string; imagen: string },
  ) {
    return {
      message: 'a new post was created',
      newPost,
    };
  }

  // METODO GET: API de listado de posts
  @Get('list')
  getList() {
    return {
      message: 'the list of posts was obtained',
    };
  }

  // METODO DELETE: API para la eliminación de un post, en caso el mismo pertenezca al usuario autenticado
  @Delete('delete/:id')
  deletePost(@Param('id') id: string) {
    return {
      message: `Post with id ${id} has been successfully removed`,
    };
  }

  // METODO PUT: API que permita, al usuario autenticado, votar o quitar el voto dado a un post
  @Put('update/:id')
  updatePost(@Param('id') id: string) {
    return {
      message: `The post with id ${id} has been updated successfully`,
    };
  }
}
