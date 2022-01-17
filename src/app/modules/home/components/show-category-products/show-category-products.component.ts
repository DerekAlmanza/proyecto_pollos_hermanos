import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../_model/product';
import { Category } from '../../_model/category';
import { ProductService } from '../../_service/product.service';

@Component({
  selector: 'app-show-category-products',
  templateUrl: './show-category-products.component.html',
  styleUrls: ['./show-category-products.component.css']
})
export class ShowCategoryProductsComponent implements OnInit {

  product:Product = new Product(); // Datos del producto
  products: Product[] = [];
  categories:Category[] = []; // Categorías asociadas al producto
  category: Category = new Category();
  id_category: any = null;

  constructor(
    private product_service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_category = this.route.snapshot.paramMap.get('id_category');
    this.getProductsCategory(this.id_category);
  }

  /** Obtener todos los productos de manera aleatoria  */
  getProductsCategory(id_category:number) {
    this.product_service.getProductsCategory(id_category).subscribe(
      res => {
        this.products = res;
      },
      err => console.log(err)
    );
  }

  productDetail(gtin:string) {
    this.router.navigate([`product-detail/${gtin}`])
  }

}
