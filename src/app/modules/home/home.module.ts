import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { ShowProductsComponent } from './components/show-products/show-products.component';
import { ShowCategoryProductsComponent } from './components/show-category-products/show-category-products.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ShowProductsComponent,
    ShowCategoryProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule,
    RouterModule
  ]
})
export class HomeModule { }
