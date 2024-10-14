import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type ClaimDocument = HydratedDocument<Claim>

@Schema({ timestamps: true })
export class Claim {
    @Prop({ required: true })
    name: string
    @Prop()
    colour: string
    @Prop({ type: Types.ObjectId, ref: "Claim" })
    parent: Types.ObjectId
    @Prop({ required: true, default: false })
    is_parent: boolean
}

export const ClaimSchema = SchemaFactory.createForClass(Claim)

