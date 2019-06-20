import { Pr } from './pr.class';
import { Product } from './product.class';

export class Prli{
    id: number;
    pr: Pr;
    product: Product;
    quantity: number;

    constructor(
        id:number = 0,
        pr:Pr = new Pr(),
        product:Product = new Product(),
        quantity: number = 0

    ){}

    about(): string{
        return "Purchase Request Line Item: id = " + this.id + ", Purchase Request Id: " + this.pr.id
        + ", product = " + this.product.name + ", quantity = " + this.quantity;
    }
    
}