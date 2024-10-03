import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type MethodDocument = HydratedDocument<Method>

@Schema({ timestamps: true })
export class Method {
    @Prop({ required: true })
    name: string
}

export const MethodSchema = SchemaFactory.createForClass(Method)

