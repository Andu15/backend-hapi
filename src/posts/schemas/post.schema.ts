import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  imagen: string;

  @Prop()
  like: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
