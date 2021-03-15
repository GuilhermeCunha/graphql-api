import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Hobby } from './hobby.schema';

@Schema()
export class Person {
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ type: [Types.ObjectId], ref: Hobby.name })
  hobbies: Types.ObjectId[] | Hobby[];
}

export type PersonDocument = Person & Document;

export const PersonSchema = SchemaFactory.createForClass(Person);
