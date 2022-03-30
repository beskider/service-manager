import { Inject, Injectable, LoggerService, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Client, ClientDocument } from "./client.schema";
import { Model } from 'mongoose'
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import * as mongoose from "mongoose";

@Injectable()
export class ClientsService {
 
  constructor(
    @InjectModel('Client') private clientModel: Model<ClientDocument>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  async getAll(): Promise<Client[]> {
    this.logger.debug(`Calling getAll()`, ClientsService.name)
    return await this.clientModel.find().exec()
  }

  async getClientById(id: string): Promise<Client> {
    this.logger.debug(`Calling getClinetById(${id})`, ClientsService.name)
    return await this.findClientById(id)
  }

  async addClient(createClientDto: CreateClientDto): Promise<Client> {
    const createClient = new this.clientModel(createClientDto)
    this.logger.log(`Added new client, id: ${createClient.id}`, ClientsService.name)
    this.logger.debug(`New client data: ${createClient}`, ClientsService.name)
    return await createClient.save()
  }

  async updateClient(id: string, updateClientDto: UpdateClientDto) {
    this.logger.debug(`Calling updateClient(${id}) with body data: ${JSON.stringify(updateClientDto)}`, ClientsService.name)
    await this.findClientById(id) // check if the client exists in db
    const client = await this.clientModel.findOne({ _id: id }).exec()
    client.overwrite(updateClientDto)
    this.logger.log(`Updated client with id: ${id}`, ClientsService.name)
    return await client.save()
  }

  async deleteClient(id: string): Promise<void> {
    this.logger.debug(`Calling deleteClient(${id})`, ClientsService.name)
    const client = await this.findClientById(id)
    this.logger.log(`Deleted client with id: ${id}`, ClientsService.name)
    await this.clientModel.deleteOne(client).exec()
  }

  private async findClientById(id: string): Promise<Client> {
    this.logger.debug(`Calling findClientById(${id})`, ClientsService.name)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Not valide id`)
    }
    const client = await this.clientModel.findById(id).exec()
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`)
    }
    return client
  }
  
}