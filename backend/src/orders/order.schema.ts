import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderStatus } from "./order-status.enum";
import * as mongoose from 'mongoose'
import { Client } from "src/clients/client.schema";

export type OrderDocument = Order & Document

@Schema()
export class Order {

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  })
  client: Client

  @Prop()
  content: string
  
  @Prop()
  notes: string

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.New
  })
  status: string

}

export const OrderSchema = SchemaFactory.createForClass(Order)