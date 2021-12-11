import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
// import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [],
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
