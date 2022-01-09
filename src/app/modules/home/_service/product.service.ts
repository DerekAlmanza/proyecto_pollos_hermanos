import { Injectable } from '@angular/core';
import { Product } from '../_model/product';
import { Category } from '../_model/category';
import { HttpClient } from '@angular/common/http';
import { ApisURI } from 'src/app/shared/apis-uri';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURI= ApisURI.dwf20221apiURI;
  private resource = "/product";

  constructor(
    private httpClient: HttpClient
  ) { }

  getProducts() {
    return this.httpClient.get<Product[]>(this.apiURI + this.resource);
  }

  getProduct(gtin: string) {
    return this.httpClient.get<Product>(this.apiURI + this.resource + `/${gtin}`);
  }

  createProduct(product: Product) {
    return this.httpClient.post(this.apiURI + this.resource, product);
  }

  updateProduct(product: Product) {
    return this.httpClient.put(this.apiURI + this.resource + `/${product.id_product}`, product);
  }

  updateProductCategory(id_product: number, category: Category) {
    return this.httpClient.put(this.apiURI + this.resource + `/${id_product}/category`, category);
  }

  deleteProduct(id_product: number) {
    return this.httpClient.delete(this.apiURI + this.resource + `/${id_product}`);
  }

  getProductsRandom() {
    return this.httpClient.get<Product[]>(this.apiURI + `${this.resource}/random`);
  }
}
