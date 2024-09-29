import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "../user/user.schema";

export type ArticleDocument = HydratedDocument<Article>

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
    @Prop()
    sections: ArticleSection
    // The content of the article
    @Prop()
    content: string
    // Is the article approved
    @Prop()
    is_approved: boolean
    // When the article was approved
    @Prop()
    approved_at: Date
    // The user who approved the article
    @Prop()
    approved_by: User
    // Number of ratings
    @Prop()
    total_ratings: number
    // The calculated rating (average)
    @Prop()
    rating: number
    // When the article was analysed
    @Prop()
    analysed_at: Date
    // Who analysed the article
    @Prop()
    analysed_by: User
    // If the quality check was successfuly
    @Prop()
    quality_check_pass: boolean
    // When the quality check was completed
    @Prop()
    quality_checked_at: Date
    // Who conducted the quality check
    @Prop()
    quality_checked_by: User
    // Any comments that moderators have regarding the analysis and approval process
    @Prop()
    moderation_comments: string
}

export const ArticleSchema = SchemaFactory.createForClass(Article)

export type ArticleSection = {
    /**
     * Easily selectable type so we can know the structure when we are interpreting it
     */
    type: "Volume" | "Edition"
    /**
     * Represents the string representation of the section, such as "Volume 1", "First Edition"
     */
    title: string,
    /**
     * The literal number of the section.
     * Volume 1 = 1
     * First Edition = 1
     * Journal Six = 6
     */
    number: number
} | {
    type: "Pages",
    /**
     * Represents the string representation of the section, such as "Pages 1, 3, 5-6" or "Page 1" or "Pages 56-100"
     */
    title: string,
    /**
     * The literal page numbers. 
     * Since submissions will often contain several 
     */
    pages: number[]
}