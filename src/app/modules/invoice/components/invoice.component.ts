import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { InvoiceService } from '../_service/invoice.service';
import { Item } from '../_model/item';
import { Invoice } from '../_model/invoice';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  
  invoices: Invoice[] = [];
  invoice: Invoice = new Invoice();
  items: Item[] = [];
  item: Item = new Item();
  submitted = false;
  formulario = this.formBuilder.group({
    id_invoice: [''],
    rfc: [''],
    subtotal: [''],
    taxes: [''],
    total: [''],
    created_at: ['']
})


  constructor(
    private invoice_service: InvoiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  /** Método que nos lista las facturas del cliente **/
  getInvoice(){
    this.invoice_service.getCart().subscribe(
      res => this.invoices = res,
      err => console.log(err)
    )
  }

  /** Método que llama a getInvoice() **/
  ngOnInit(): void {
    this.getInvoice();
  }

  /** Método que nos devuelve el detalle de la factura seleccionada **/
  invoiceDetail(id_invoice:number){
    console.log("aqui redirigimos al detalle de la factura");
    this.invoice_service.getItems(id_invoice).subscribe(
      res => {
        this.items = res;
        console.log(res);
        $('#invoiceModal').modal('show');
      },
      err => console.log(err)
    )
  }
   /** Método para cerrar el modal cuando mostramos el detalle de una factura **/
  closeModal(){
    $('#invoiceModal').modal('hide');
    this.submitted = false;
  }

}
