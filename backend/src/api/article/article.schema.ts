import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { User } from "../user/user.schema";

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
  // The title of the article
  @Prop({ required: true })
  title: string
  // The author(s)
  @Prop({ required: true })
  authors: string[]
  // The journal the article was published into
  @Prop({ required: true })
  journal: string
  // The published year
  @Prop({ required: true })
  year: number
  // The URL
  @Prop({ required: true })
  url: string
  // The ISBN
  @Prop()
  isbn: string
  // The pages or chapters the article covers
  @Prop({ required: true })
  sections: string
  // The content of the article
  @Prop({ required: true })
  content: string
  // Is the article approved
  @Prop()
  is_approved: boolean
  // When the article was approved
  @Prop()
  approved_at: Date
  // The user who approved the article
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: "User" } })
  approved_by: User
  // Rating sum
  @Prop({ default: 0, required: true })
  rating_sum: number;
  // Number of ratings
  @Prop()
  total_ratings: number
  // The calculated rating (average)
  @Prop()
  rating: number
  // When the article was analysed
  @Prop()
  is_analysed: boolean
  @Prop()
  analysed_at: Date
  // Who analysed the article
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: "User" } })
  analysed_by: User
  // If the quality check was successfuly
  @Prop()
  quality_check_pass: boolean
  // When the quality check was completed
  @Prop()
  quality_checked_at: Date
  // Who conducted the quality check
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: "User" } })
  quality_checked_by: User
  // Any comments that moderators have regarding the analysis and approval process
  @Prop()
  moderation_comments: string
  @Prop({ type: Types.Array<Types.ObjectId>, ref: "Claims", default: [] })
  claims: Types.ObjectId[]
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
