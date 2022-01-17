import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApisURI } from "src/app/shared/apis-uri";
import { CustomerData } from "src/app/shared/customer-data";
import { Cart } from "../_model/cart";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private apiURI = ApisURI.dwf20221apiURI;
  private resource = "/cart";

  private rfc = CustomerData.RFC;

  constructor(private http: HttpClient) {}

  getCart(rfc: string = this.rfc) {
    return this.http.get<Cart[]>(this.apiURI + this.resource + `/${rfc}`);
  }

  addToCart(cart: Cart) {
    return this.http.post(this.apiURI + this.resource, cart);
  }

  removeFromCart(id_cart: number) {
    return this.http.delete(this.apiURI + this.resource + `/${id_cart}`);
  }

  deleteCart(rfc: string = this.rfc) {
    return this.http.delete(this.apiURI + this.resource + `/clear/${rfc}`);
  }
}
