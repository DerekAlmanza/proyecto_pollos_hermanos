import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../_model/product';
import { Category } from '../../_model/category';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  product:Product = new Product(); // Datos del producto
  products: Product[] = [];
  categories:Category[] = []; // Categorías asociadas al producto
  category: Category = new Category();
  id_category: number = 1;

  constructor(
    private product_service: ProductService,
    private category_service: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductsRandom();
  }

  /** Obtener todos los productos de manera aleatoria  */
  getProductsRandom() {
    this.product_service.getProductsRandom().subscribe(
      res => {
        this.products = res;
        this.getCategories();
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

  productDetail(gtin:string) {
    this.router.navigate([`product-detail/${gtin}`])
  }

  showCategoryProducts(event: any) {
    this.id_category = event.target.value;
    this.router.navigate([`category-products/${this.id_category}`])
  }

}
