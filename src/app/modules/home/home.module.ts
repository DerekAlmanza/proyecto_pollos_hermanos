import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { ShowProductsComponent } from './components/show-products/show-products.component';



@NgModule({
  declarations: [
    ShowProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule
  ]
})
export class HomeModule { }
