import { IsEnum, IsOptional, IsString } from "class-validator"
import { Client } from "src/clients/client.schema"
import { OrderStatus } from "../order-status.enum"

export class CreateOrderDto {

  @IsString()
  client: Client
  
  @IsString()
  content: string
  
  @IsOptional()
  @IsString()
  notes: string

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus

}