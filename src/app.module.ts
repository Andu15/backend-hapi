import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { PostModule } from './modules/post.module';

// const mongodb = {
//   user: 'user',
//   pwd: 'happimongo',
//   host: 'localhost',
//   port: 27017,
//   dbName: 'my_hapi',
// };
// const url = `mongodb://${mongodb.user}:${mongodb.pwd}@${mongodb.host}:${mongodb.port}/nest`;
// console.log(url);

const url = 'mongodb://localhost/hapi';

@Module({
  imports: [MongooseModule.forRoot(url), UserModule, PostModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
