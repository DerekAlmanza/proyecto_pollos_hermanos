
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { RegionService } from './../../_service/region.service';
import { CustomerService } from './../../_service/customer.service';
import { Region } from './../../_model/region';
import { Customer } from './../../_model/customer';

declare var $:any;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:Customer[] = [];
  customer:Customer = new Customer();
  regions:Region[] = [];
  formulario = this.formBuilder.group({
    address:['', Validators.required],
    id_customer:[''],
    id_region:['', Validators.required],
    image:[''],
    mail:['', Validators.required],
    name:['', Validators.required],
    rfc:['', Validators.required],
    surname:['', Validators.required],
    status:['']
  })
  submitted = false;

  constructor(
    private customer_service: CustomerService,
    private region_service: RegionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  /**
   * Obtener todos los clientes.
   */
  getCustomers(){
    this.customer_service.getCustomers().subscribe(
      res => this.customers = res,
      err => console.log(err)
    )
  }

  /**
   * Método que se va a llamar cuando el formulario se ejecute
   */
   onSubmit() {
    this.submitted = true;
    this.customer_service.createCustomer(this.formulario.value).subscribe(
      () => {
        this.getCustomers();
        this.closeModal();
        this.successAlert();
      },
      err => {
        console.log(err);
        this.failedAlert();
      }
    );
  }

  /**
   * Crea un nuevo cliente
   */
  createCustomer() {
    this.getRegions();
    this.formulario.reset();
    this.formulario.controls['id_region'].setValue(0);
    $('#customer_modal').modal('show');
  }

  /**
   * Obtener todas las regiones. 
  */
   getRegions() {
    this.region_service.getRegions().subscribe(
      res => this.regions = res,
      err => console.log(err)
    );
  }

  /**
   * Elimina una región por medio del id de la región.
   * @param id_customer 
   */
   deleteCustomer(id_customer:number) {
    Swal.fire({
      title: '¿Seguro que deseas eliminar al cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customer_service.deleteCustomer(id_customer).subscribe(
          () => {
            this.getCustomers();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Eliminación exitosa!',
              showConfirmButton: false,
              timer: 2000
            }) 
          },
          err => {
            console.log(err);
            this.failedAlert();
          }
        )
      }
    })
  }

  /**
  * Método para mandar un mensaje de alerta de que se ha registró o actualizó exitosamente.
  */
  successAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Registro exitoso!',
      showConfirmButton: false,
      timer: 2000
    })
  }

  /**
  * Alerta en caso de que algo salga mal.
  */
  failedAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salió mal ):',
    })
  }

  /** Getter */
  get f() {
    return this.formulario.controls;
  }

  /** Método encargado de cerrar el modal. */
  closeModal() {
    $('#customer_modal').modal('hide');
    this.submitted = false;
  }

  /** Método que nos guiará a los detalles del cliente por medio de su rfc. */
  customerDetail(rfc: string) {
    this.router.navigate([`customer-detail/${rfc}`]);
  }

}
