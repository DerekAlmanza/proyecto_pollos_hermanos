import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/productImage';
import { Category } from '../../_model/category';
import { ProductService } from '../../_service/product.service';
import { ProductImageService } from './../../../product/_service/product-image.service';
import { CategoryService } from '../../_service/category.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  product:Product = new Product(); // Datos del producto
  products: Product[] = [];
  gtin:any = null;
  categories:Category[] = []; // Categorías asociadas al producto
  category: Category = new Category();
  images: ProductImage[] = []; // Imagenes del producto
  imageChangedEvent: any;

  constructor(
    private product_service: ProductService,
    private product_image_service: ProductImageService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  /** Obtener todos los productos  */
  getProducts() {
    this.product_service.getProductsRandom().subscribe(
      res => this.products = res,
      err => console.log(err)
    );
  }

  /**
   * Obtener categoría(s) de un solo producto
   * @param id_category 
   */
   getCategory(id_category: number) {
    this.categoryService.getCategory(id_category).subscribe(
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

  /** Método cuando ocurra un cambio dentro del archivo de la imagen. */
  fileChangeEvent(event:any) {
    this.imageChangedEvent = event;
  }

  productDetail(gtin:string) {
    this.router.navigate([`product-detail/${gtin}`])
  }

}
