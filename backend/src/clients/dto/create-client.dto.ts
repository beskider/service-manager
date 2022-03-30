import { IsEmail, IsOptional, IsString } from "class-validator"


export class CreateClientDto {

  @IsString()
  name: string
  
  @IsOptional()
  @IsString()
  notes: string
  
  @IsEmail()
  email: string
  
  @IsOptional()
  @IsString()
  phone: string

}