import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './components/invoice.component'; 
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    InvoiceComponent
  ]
})

export class InvoiceModule { }
