import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { ProductPaymentComponent } from './components/product-payment/product-payment.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductPaymentComponent
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
    ProductPaymentComponent
  ]
})
export class ProductModule { }
