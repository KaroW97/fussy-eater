import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  id: string

  @Prop({ required: true })
  myRating: string

  @Prop()
  comments: string[]

  @Prop()
  favRestaurant: boolean

  @Prop()
  visited: boolean

  @Prop()
  visitedDate: Date

  @Prop()
  predictedVisitDate: Date

  @Prop({ default: Date.now() })
  createdDate: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
