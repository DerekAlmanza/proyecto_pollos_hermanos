import { Product } from "./product";

export class Cart {
  id_cart: number;
  id_product: number;
  product: Product;
  quantity: number;
  rfc: string;

  constructor() {
    this.id_cart = 0;
    this.id_product = 0;
    this.product = new Product();
    this.quantity = 0;
    this.rfc = "";
  }
}
