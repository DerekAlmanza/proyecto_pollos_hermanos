import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../_model/product';
import { Category } from '../../_model/category';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';
import { FormBuilder, Validators } from '@angular/forms';

declare var $:any;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[] = []; // Datos del producto
  categories:Category[] = []; // Categorías asaociadas al producto
  formulario = this.formBuilder.group({
    description: [''],
    gtin: ['', Validators.required],
    id_category: ['', Validators.required],
    id_product:	[''],
    price: ['', Validators.required],
    product: ['', Validators.required],
    stock: ['', Validators.required],
    status: ['']
  })
  submitted = false;

  constructor(
    private product_service: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  /** Obtener todos los productos  */
  getProducts() {
    this.product_service.getProducts().subscribe(
      res => this.products = res,
      err => console.log(err)
    );
  }

  /** Crea un nuevo producto. */
  createProduct() {
    this.getCategories();
    this.formulario.reset();
    this.formulario.controls['id_category'].setValue(0);
    $('#product_modal').modal('show');
  }

  /** Método que se va a ejecutar cuandoel formulario se ejecute */
  onSubmit() {
    this.submitted = true;
    this.product_service.createProduct(this.formulario.value).subscribe(
      () => {
        this.getProducts();
        this.closeModal();
        this.successAlert();
      },
      err => {
        console.log(err);
        this.failedAlert(); 
      }
    )
  }

  /**
   * Elimina un producto por medio de su respectivo id.
   * @param id_product 
   */
   deleteProduct(id_product:number) {
    Swal.fire({
      title: '¿Seguro que deseas eliminar al cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.product_service.deleteProduct(id_product).subscribe(
          () => {
            this.getProducts();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Eliminación exitosa!',
              showConfirmButton: false,
              timer: 2000
            }) 
          },
          err => {
            console.log(err);
            this.failedAlert();
          }
        )
      }
    })
  }

  /** Obtener todas las categorías */
  getCategories() {
    this.categoryService.getCategories().subscribe(
      res => this.categories = res,
      err => console.log(err)
    );
  }

  /**
  * Método para mandar un mensaje de alerta de que se ha registró o actualizó exitosamente.
  */
   successAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Registro exitoso!',
      showConfirmButton: false,
      timer: 2000
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

  /** Getter */
  get f() {
    return this.formulario.controls;
  }

  /** Método encargado de cerrar el modal. */
  closeModal() {
    $('#product_modal').modal('hide');
    this.submitted = false;
  }

  productDetail(gtin:string) {
    this.router.navigate([`product-detail/${gtin}`])
  }

}
