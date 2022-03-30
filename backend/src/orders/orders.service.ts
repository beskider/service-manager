import { Injectable, NotFoundException, Inject, LoggerService } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Order, OrderDocument } from "./order.schema"
import { Model } from 'mongoose'
import { CreateOrderDto } from "./dto/create-order.dto"
import { UpdateOrderDto } from "./dto/update-order.dto"
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston"
import * as mongoose from 'mongoose' 

@Injectable()
export class OrdersService {
  
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  async getAll(): Promise<Order[]> {
    this.logger.debug(`Calling getAll()`, OrdersService.name) 
    return await this.orderModel.find().exec()
  }

  async getOrderById(id: string): Promise<Order> {
    this.logger.debug(`Calling getOrderById(${id})`, OrdersService.name) 
    return await this.findOrderById(id)
  }
  
  async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto) 
    this.logger.log(`Added new order, id: ${createdOrder.id}`, OrdersService.name)
    this.logger.debug(`New order data: ${createdOrder}`, OrdersService.name)
    return await createdOrder.save()
  }
  
  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    this.logger.debug(`Calling  updateOrder(${id}) with body data: ${JSON.stringify(updateOrderDto)}`, OrdersService.name) 
    await this.findOrderById(id) // check if the order exists in db
    const order = await this.orderModel.findOne({ _id: id }).exec()
    order.overwrite(updateOrderDto)
    this.logger.log(`Updated order with id: ${id}`, OrdersService.name)
    return await order.save()
  }
  
  async deleteOrder(id: string): Promise<void> {
    this.logger.debug(`Calling  deleteOrder(${id})`, OrdersService.name) 
    const order = await this.findOrderById(id)
    this.logger.log(`Deleted order with id: ${id}`, OrdersService.name)
    await this.orderModel.deleteOne(order).exec()
  }
  
  private async findOrderById(id: string): Promise<Order> {
    this.logger.debug(`Calling findOrderById(${id})`, OrdersService.name) 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Not valid id`)
    }
    const order = await this.orderModel.findById(id).exec()
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`)
    }
    return order
  }

}

