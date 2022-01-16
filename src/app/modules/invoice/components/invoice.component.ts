import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InvoiceService } from '../_service/invoice.service';
import { Item } from '../_model/item';
import { Invoice } from '../_model/invoice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  
  invoices: Invoice[] = [];
  invoice: Invoice = new Invoice();
  items: Item[] = [];
  submitted = false;

  constructor(
    private invoice_service: InvoiceService,
    private router: Router
  ) { }

  getInvoice(){
    this.invoice_service.getCart().subscribe(
      res => this.invoices = res,
      err => console.log(err)
    )
  }

  ngOnInit(): void {
    this.getInvoice();
  }

  invoiceDetail(rd_invoice:string){
    console.log("aqui redirigimos al detalle de la factura");
  }

}
