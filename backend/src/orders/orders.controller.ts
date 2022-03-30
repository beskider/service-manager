import { Body, Controller, Delete, Get, Inject, LoggerService, Param, ParseEnumPipe, Post, Put } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrdersService } from "./orders.service";

@Controller('orders')
export class OrdersController {

  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.getAll()
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.getOrderById(id)
  }
  
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.addOrder(createOrderDto)
  }
  
  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    return this.ordersService.updateOrder(id, updateOrderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id)
  }

}