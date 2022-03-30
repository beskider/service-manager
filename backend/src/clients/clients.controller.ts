import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Controller('clients')
export class ClientsController {

  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientsService.getAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.getClientById(id)
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.addClient(createClientDto)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return this.clientsService.updateClient(id, updateClientDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.deleteClient(id)
  }

}