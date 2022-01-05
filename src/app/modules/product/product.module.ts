import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductDetailComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule
  ],
  exports: [
    CategoryComponent,
    ProductComponent,
    ProductDetailComponent,
    CartComponent
  ]
})
export class ProductModule { }
