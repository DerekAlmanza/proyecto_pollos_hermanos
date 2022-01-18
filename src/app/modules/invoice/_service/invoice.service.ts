import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApisURI } from 'src/app/shared/apis-uri';
import { CustomerData } from 'src/app/shared/customer-data'; 
import { Invoice } from '../_model/invoice';
import { Item } from '../_model/item';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private ApiURI = ApisURI.dwf20221apiURI;
  private rfc = CustomerData.RFC;
  private resource = "/invoice";

  constructor(private httpClient: HttpClient
    ) { }
    
  getCart(rfc: string = this.rfc){
    return this.httpClient.get<Invoice[]>(this.ApiURI + this.resource + `/${rfc}`);
  }

  purchase(rfc: string = this.rfc){
    return this.httpClient.post(this.ApiURI + this.resource + `/${rfc}`, {});
  }

  getItems(id_invoice: number){
    return this.httpClient.get<Item[]>(this.ApiURI + this.resource + `/item/${id_invoice}`);
  }

}
