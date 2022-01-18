import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../_model/product';
import { ProductService } from '../../_service/product.service';
import { ProductImage } from '../../_model/productImage';
import { ProductImageService } from '../../_service/product-image.service';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';

import { CroppedEvent } from 'ngx-photo-editor';
import Swal from 'sweetalert2';
import { CartService } from '../../_service/cart.service';
import { CustomerData } from 'src/app/shared/customer-data';

declare var $:any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();
  gtin:any = null;
  categories: Category[] = [];
  category: Category = new Category();

  images: ProductImage[] = [];
  image: ProductImage = new ProductImage();
  file: any;
  imageChangedEvent: any;
  base64: any;

  submitted = false;

  // Formulario para actualizar datos del producto
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

  // Formulario para actualizar categoría del producto
  formularioCategory = this.formBuilder.group({
    id_category: ['', Validators.required]
  })

  // Formulario para agregar al carrito
  formularioCart = this.formBuilder.group({
    id_product: [''],
    product: [''],
    quantity: ['', Validators.required],
    rfc: ['']
  })

  constructor(
    private product_service: ProductService,
    private product_image_service: ProductImageService,
    private category_service: CategoryService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    this.getProduct(this.gtin);
  }

  getProduct(gtin:string) {
    this.product_service.getProduct(gtin).subscribe(
      res => {
        this.product = res;
        this.getCategory(this.product.id_category);
        this.getProductImages(this.product.id_product);
      },
      err => console.log(err)
    );
  }

  /** Obtener todas las categorías. */
  getCategories() {
    this.category_service.getCategories().subscribe(
      res => this.categories = res,
      err => console.log(err)
    );
  }

  /**
   * Obtener categoría(s) de un solo producto
   * @param id_category 
   */
  getCategory(id_category: number) {
    this.category_service.getCategory(id_category).subscribe(
      res => this.category = res,
      err => console.log(err)
    );
  }

  /**
   * Obtener imagen de producto.
   * @param id_product 
   */
   getProductImages(id_product: number) {
    this.product_image_service.getProductImages(id_product).subscribe(
      res => this.images = res,
      err => console.log(err)
    );
  }

  /** Método que se va a llamar cuando el formulario de product se ejecute. */
  onSubmit() {
    this.submitted = true;
    this.product_service.updateProduct(this.formulario.value).subscribe(
      () => {
        this.gtin = this.formulario.controls['gtin'].value;
        this.getProduct(this.gtin);
        this.router.navigate([`product-detail/${this.gtin}`]);
        this.closeProductModal();
        this.successAlert();
      },
      err => {
        console.log(err);
        this.failedAlert()
      }
    )
  }

  /** Método que se va a llamar cuando el formulario de category se ejecute. */
  onSubmitCategory() {
    this.category = new Category();
    this.category.id_category = this.formularioCategory.controls['id_category'].value;
    this.product_service.updateProductCategory(this.product.id_product, this.category).subscribe(
      () => {
        this.getProduct(this.gtin);
        this.closeCategoryModal();
        this.successAlert()
      },
      err => {
        console.log(err)
        this.failedAlert()
      }
    );
  }

  /** Método que se va a llamar cuando el formulario de image se ejecute. */
  onSubmitImage() {
    this.image.id_product = this.product.id_product;
    this.product_image_service.createProductImage(this.image).subscribe(
      () => {
        this.getProductImages(this.product.id_product);
        this.closeImageModal();
        this.successAlert();
      },
      err => {
        console.log(err)
        this.failedAlert()
      }
    );
  }

  /** */
  onSubmitCart() {
    this.formularioCart.controls['id_product'].setValue(this.product.id_product);
    this.formularioCart.controls['product'].setValue(this.product);
    this.formularioCart.controls['rfc'].setValue(CustomerData.RFC);

    this.submitted = true;

    Swal.fire({
      title: '¿Seguro que deseas agregar este producto al carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, agregalo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.formularioCart.value);
        
        this.cartService.addToCart(this.formularioCart.value).subscribe(
          () => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se ha añadido el producto de forma exitosa!',
              showConfirmButton: false,
              timer: 2000
            });
            this.submitted = false;
            this.formularioCart.controls['quantity'].setValue(1);
          },
          error => {
            console.error(error);
            this.failedAlert();
            this.submitted = false;
          }
        )
      }
    });
  }

  /**
   * Actualiza producto
   * @param product 
   */
  updateProduct(product: Product) {
    this.formulario.controls['id_product'].setValue(product.id_product);
    this.formulario.controls['gtin'].setValue(product.gtin);
    this.formulario.controls['product'].setValue(product.product);
    this.formulario.controls['description'].setValue(product.description);
    this.formulario.controls['price'].setValue(product.price);
    this.formulario.controls['stock'].setValue(product.stock);
    this.formulario.controls['id_category'].setValue(product.id_category);
    this.formulario.controls['status'].setValue(product.status);
    $('#product_modal').modal('show');
  }

  /** Actualiza categoría del producto */
  updateProductCategory() {
    this.getCategories();
    this.formularioCategory.controls['id_category'].setValue(this.product.id_category);
    $('#category_modal').modal('show');
  }

  /** Elmina la imagen del producto */
  deleteProductImage(id_product_image: number) {
    Swal.fire({
      title: '¿Seguro que deseas eliminar la imagen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.product_image_service.deleteProductImage(id_product_image).subscribe(
          () => {
            this.getProductImages(this.product.id_product);
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

  /** Método auxiliar para mandar un mensaje de alerta de que se ha registró o actualizó exitosamente.*/
  successAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Actualización exitosa!',
      showConfirmButton: false,
      timer: 2000
    })
  }

  /** Auxiliar que alerta en caso de que algo salga mal.*/
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

  /** Método encargado de cerrar el modal product. */
  closeProductModal() {
    $('#product_modal').modal('hide');
    this.submitted = false;
  }

  /** Método encargado de cerrar el modal category. */
  closeCategoryModal() {
    $('#category_modal').modal('hide');
    this.submitted = false;
  }

  /** Método encargado de abrir el modal image. */
  uploadProductImage () {
    $('#image_modal').modal('show');
  }

  /** Método encargado de cerrar el modal image. */
  closeImageModal() {
    $('#image_modal').modal('hide');
    this.submitted = false;
  }

  /** Método cuando ocurra un cambio dentro del archivo de la imagen. */
  fileChangeEvent(event:any) {
    this.imageChangedEvent = event;
  }

  /** 
   * Para este punto ya se seleccionó la imagen, por la que la debemos de pasar a base 64 y se asigna
   * a objeto Image
  */
  imageCropped(event: CroppedEvent) {
    this.base64 = event.base64;
    this.image.image = this.base64;
  }

  range() {
    return Array(this.product.stock).fill(0).map((_, i) => i + 1)
  }
}
