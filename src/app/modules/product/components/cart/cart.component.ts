import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
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

  /** Metodo para eliminar un elemento del carrito. */
  removeFromCart(id_cart: number) {
    Swal.fire({
      title: '¿Seguro que deseas eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(id_cart).subscribe(
          _ => {
            this.getCart();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Eliminación exitosa!',
              showConfirmButton: false,
              timer: 2000
            });
          },
          err => {
            console.error(err);
            this.failedAlert();
          }
        )
      }
    })
  }

  /**
  * Alerta en caso de que algo salga mal.
  */
  failedAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salió mal ):',
    })
  }
}
