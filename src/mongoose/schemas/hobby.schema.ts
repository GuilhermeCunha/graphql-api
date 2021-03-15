import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Hobby {
  _id: Types.ObjectId;

  @Prop()
  name: string;
}

export type HobbyDocument = Hobby & Document;

export const HobbySchema = SchemaFactory.createForClass(Hobby);
