export class Product {
    description: string;
    gtin: string;
    id_category: number;
    id_product:	number;
    price: number;
    product: string;
    stock: number;
    status: number;

    constructor () {
        this.description = "";
        this.gtin = "";
        this.id_category = 0;
        this.id_product = 0;
        this.price = 0.0;
        this.product = "";
        this.stock = 0;
        this.status = 1;
    }
}