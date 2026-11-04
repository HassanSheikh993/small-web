import { Schema,SchemaFactory,Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument,Types } from "mongoose";

export type SiteDocument = HydratedDocument<Site>;

@Schema({timestamps:true})

export class Site{
  @Prop({required:true,trim:true,lowercase:true, unique:true})
  address:string;

  @Prop({required:true, trim:true})
  title:string

  @Prop({required:true})
  html:string

  @Prop({required:true})
  text:string
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId
}

export const SiteSchema = SchemaFactory.createForClass(Site);
SiteSchema.index({ title: 'text', text: 'text' });
