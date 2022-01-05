import { Component, OnInit } from "@angular/core";
import { Cart } from "../../_model/cart";
import { CartService } from "../../_service/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  /** Metodo para obtener el carrito correspondiente. */
  getCart() {
    this.cartService.getCart().subscribe(
      (res) => {
        console.log(res);
        this.cart = res;
      },
      (error) => console.error(error)
    );
  }
}
