import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type MethodDocument = HydratedDocument<Method>

@Schema({ timestamps: true })
export class Method {
    @Prop({ type: { type: Types.ObjectId } })
    _id: string
    @Prop({ required: true })
    name: string
}

export const MethodSchema = SchemaFactory.createForClass(Method)

