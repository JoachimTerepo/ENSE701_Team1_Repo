import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ArticleDocument = HydratedDocument<Article>

@Schema({ timestamps: true })
export class Article {
    @Prop({ required: true })
    title: string
    @Prop({ required: true })
    authors: string[]
    @Prop({ required: true })
    journal: string
    @Prop({ required: true })
    year: number
    @Prop({ required: true })
    doi: string
    @Prop()
    isbn: string
    @Prop()
    pages: number[]
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