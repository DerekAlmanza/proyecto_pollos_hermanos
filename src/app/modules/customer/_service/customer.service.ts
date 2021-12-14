import { Injectable } from '@angular/core';
import { ApisURI } from './../../../shared/apis-uri';
import { HttpClient } from '@angular/common/http';
import { Region } from './../_model/region';
import { CustomerImage } from './../_model/customerImage';
import { Customer } from './../_model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiURI = ApisURI.dwf20221apiURI;
  private resource = '/customer';
   
  constructor(
    private httpClient: HttpClient
  ) { }

  getCustomers() {
    return this.httpClient.get<Customer[]>(this.apiURI + this.resource);
  }

  getCustomer(rfc: string) {
    return this.httpClient.get<Customer>(this.apiURI + this.resource + `/${rfc}`);
  }

  createCustomer(customer: Customer) {
    return this.httpClient.post(this.apiURI + this.resource, customer);
  }

  updateCustomer(customer: Customer) {
    return this.httpClient.put(this.apiURI + this.resource + `/${customer.id_customer}`, customer);
  }

  deleteCustomer(id_costumer: number) {
    return this.httpClient.delete(this.apiURI + this.resource + `/${id_costumer}`);
  }

  updateCustomerImage(id_customer: number, customerImage: CustomerImage) {
    return this.httpClient.put(this.apiURI + this.resource + `/${id_customer}/image`, customerImage);
  }

  updateCustomerRegion(id_customer: number, region: Region) {
    return this.httpClient.put(this.apiURI + this.resource + `/${id_customer}/region`, region);
  }
}
