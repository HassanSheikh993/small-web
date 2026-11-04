import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument,Types } from "mongoose";

@Schema({timestamps:true})

export class Visit{
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User", required:true})
    user:Types.ObjectId

    @Prop({required:true})
    address:string

 @Prop({ required: true, enum: ['typed', 'link', 'back', 'forward', 'history', 'search'] })
  how: string;

  @Prop({ default: Date.now })
  visitedAt: Date;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
VisitSchema.index({ user: 1, visitedAt: -1 });
