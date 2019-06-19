import { Vendor } from './vendor.class';

export class Product{
    id: number;
    vendor: Vendor;
    partNumber: string;
    name: string;
    price: number;
    unit: string;
    photoPath: string;

    constructor(
    id:number=0,
    vendor:Vendor= new Vendor(), 
    partNumber: string="",
    name: string="",price: number=0,
    unit: string="", photoPath: string=""){}

    about(): string{
        return "Product: id = " + this.id + ", vendor = " + this.vendor.name + ", partNumber = " + this.partNumber + ", name = " + this.name +
        ", price = " + this.price + ", unit = " + this.unit + ", photoPath = " + this.photoPath;
    }
}