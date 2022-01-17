import { Injectable } from '@angular/core';
import { ProductImage } from '../_model/productImage';
import { HttpClient } from '@angular/common/http';
import { ApisURI } from 'src/app/shared/apis-uri';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private apiURI= ApisURI.dwf20221apiURI;
  private resource = "/product-image";

  constructor(
    private httpClient: HttpClient
  ) { }

  getProductImages(id_product: number) {
    return this.httpClient.get<ProductImage[]>(this.apiURI + this.resource + `/${id_product}`);
  }

  createProductImage(productImage: ProductImage) {
    return this.httpClient.post(this.apiURI + this.resource, productImage);
  }

  deleteProductImage(id_product_image: number) {
    return this.httpClient.delete(this.apiURI + this.resource + `/${id_product_image}`);
  }
}
