import { ApisURI } from './../../../shared/apis-uri';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURI = ApisURI.dwf20221apiURI;
  private resource = "/category";

  constructor(
    private httpClient: HttpClient
  ) { }

  getCategories() {
    return this.httpClient.get<Category[]>(this.apiURI + this.resource);
  }

  getCategory(id_category:number) {
    return this.httpClient.get<Category>(this.apiURI + this.resource + `/${id_category}}`);
  }

  createCategory(category:Category) {
    return this.httpClient.post(this.apiURI + this.resource, category);
  }

  updateCategory(category:Category) {
    return this.httpClient.put(this.apiURI + this.resource + `/${category.id_category}`, category);
  }

  deleteCategory(id_category:number) {
    return this.httpClient.delete(this.apiURI + this.resource + `/${id_category}` )
  }
}
