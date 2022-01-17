import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { ProductPaymentComponent } from './components/product-payment/product-payment.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductPaymentComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule,
    RouterModule
  ],
  exports: [
    CategoryComponent,
    ProductComponent,
    ProductDetailComponent,
    CartComponent
  ]
})
export class ProductModule { }
