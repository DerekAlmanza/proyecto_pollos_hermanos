import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {NgxPhotoEditorModule} from "ngx-photo-editor";
import { CommonModule } from '@angular/common';
import { RegionComponent } from './components/region/region.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';



@NgModule({
  declarations: [
    RegionComponent,
    CustomerComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule,
    RouterModule
  ],
  exports: [
    RegionComponent,
    CustomerComponent,
    CustomerDetailComponent
  ]
})
export class CustomerModule { }
