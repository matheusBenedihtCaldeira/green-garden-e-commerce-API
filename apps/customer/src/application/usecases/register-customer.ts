import { Customer } from "../models/Customer";
import { prismaClient} from "../../infra/database/prismaClient";

type RegisterCustomerRequest = {
    name: string
    lastName: string
    email: string
    telefone: string
    senha: string
}

export class RegisterCustomerUseCase {
    constructor(){}

    async execute(data: RegisterCustomerRequest){
        const customer = await prismaClient.customer.findFirst({
            where:{
                email: data.email,
            }
        });
        if(customer) throw new Error("Customer already exists")
        const newCustomer = new Customer({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            telefone: data.telefone,
            senha: data.senha,
        })
        const customerRegistred = await prismaClient.customer.create({
            data: {
                name: newCustomer.name,
                lastName: newCustomer.lastName,
                email: newCustomer.email,
                senha: newCustomer.senha,
                telefone: newCustomer.telefone
            }
        })
        console.log(customerRegistred)
        return customerRegistred;
    }
}