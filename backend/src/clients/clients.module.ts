import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientSchema } from "./client.schema";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";

@Module({
  imports: [MongooseModule.forFeature([{ 
    name: 'Client', 
    schema: ClientSchema 
  }])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}