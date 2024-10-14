import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { title } from "process";


export type ClaimDocument = HydratedDocument<Claim>

@Schema({ timestamps: true })
export class Claim {
    @Prop({ required: true, index: true })
    name: string
    @Prop()
    colour: string
    @Prop({ type: Types.ObjectId, ref: "Claim" })
    parent: Types.ObjectId
    @Prop({ required: true, default: false })
    is_parent: boolean
}

const schema = SchemaFactory.createForClass(Claim)
schema.index({ name: 'text' })

export const ClaimSchema = schema

