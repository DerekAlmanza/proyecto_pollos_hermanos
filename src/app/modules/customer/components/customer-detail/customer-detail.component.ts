import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { RegionService } from './../../_service/region.service';
import { CustomerService } from './../../_service/customer.service';
import { CustomerImage } from './../../_model/customerImage';
import { Region } from './../../_model/region';
import { Customer } from './../../_model/customer';

import { CroppedEvent } from 'ngx-photo-editor';
import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer:Customer = new Customer();
  regions:Region[] = [];
  region:Region = new Region();
  rfc:any = null;
  image:CustomerImage = new CustomerImage();
  file:any;
  imageChangedEvent:any;
  base64:any;

  // Formulario para actualizar datos del cliente
  formulario = this.formBuilder.group({
    address:['', Validators.required],
    id_customer:[''],
    mail:['', Validators.required],
    name:['', Validators.required],
    rfc:['', Validators.required],
    surname:['', Validators.required],
    status:['']
  }) 

  // Formulario para actualizar región
  formularioRegion = this.formBuilder.group({
    id_region: ['', Validators.required]
  })
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customer_service: CustomerService,
    private region_service: RegionService
  ) { }

  ngOnInit(): void {
    this.rfc = this.route.snapshot.paramMap.get('rfc');
    this.getCustomer(this.rfc);
  }

  /**
   * Obtener información de un solo cliente
   * @param rfc
   */
   getCustomer(rfc: string){
    this.customer_service.getCustomer(rfc).subscribe(
      res => {
        this.customer = res;
        this.getRegion(this.customer.id_region);
      },
      err => console.log(err)
    )
  }

  /** Método que se va a llamar cuando el formulario de customer se ejecute. */
  onSubmit() {
    this.submitted = true;
    this.customer_service.updateCustomer(this.formulario.value).subscribe(
      () => {
        this.rfc = this.formulario.controls['rfc'].value;
        this.getCustomer(this.rfc);
        this.router.navigate([`customer-detail/${this.rfc}`]);
        this.closeCustomerModal();
        this.successAlert();
      },
      err => {
        console.log(err);
        this.failedAlert();
      }
    );
  }

  /** Método que se va a llamar cuando el formulario de region se ejecute. */
  onSubmitRegion() {
    this.region = new Region();
    this.region.id_region = this.formularioRegion.controls['id_region'].value;
    this.customer_service.updateCustomerRegion(this.customer.id_customer, this.region).subscribe(
      () => {
        this.getCustomer(this.rfc);
        this.closeRegionModal();
        this.successAlert();
      },
      err => {
        console.log(err);
        this.failedAlert();
      }
    )
  }

  /** Método que se va a llamar cuando el formulario de imagen se ejecute. */
   onSubmitImage() {
    this.customer_service.updateCustomerImage(this.customer.id_customer, this.image).subscribe(
      () => {
        this.getCustomer(this.rfc);
        this.closeImageModal();
        this.successAlert();
      },
      err => {
        console.log(err);
        this.failedAlert();
      }
    )
  }

  /**
   * Actualiza cliente
   * @param customer 
   */
  updateCustomer(customer:Customer) {
    this.formulario.controls['id_customer'].setValue(customer.id_customer);
    this.formulario.controls['name'].setValue(customer.name);
    this.formulario.controls['surname'].setValue(customer.surname);
    this.formulario.controls['rfc'].setValue(customer.rfc);
    this.formulario.controls['mail'].setValue(customer.mail);
    this.formulario.controls['address'].setValue(customer.address);
    this.formulario.controls['status'].setValue(customer.status);
    $('#customer_modal').modal('show');
  }

  /** Actualiza región. */
  updateCustomerRegion() {
    this.getRegions();
    this.formularioRegion.controls['id_region'].setValue(this.customer.id_region);
    $('#region_modal').modal('show');
  }

  /** Actualiza imagen */
  updateCustomerImage() {
    $('#image_modal').modal('show');
  }

  /** Obtener todas las regiones. */
  getRegions() {
    this.region_service.getRegions().subscribe(
      res => this.regions = res,
      err => console.log(err)
    );
  }

  /**
  * Obtener una sola región por medio del id de la región.
  * @param id_region 
  */
  getRegion(id_region:number) {
    this.region_service.getRegion(id_region).subscribe(
      res => this.region = res,
      err => console.log(err)
    )
  }

  /** Método auxiliar para mandar un mensaje de alerta de que se ha registró o actualizó exitosamente.*/
  successAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Actualización exitosa!',
      showConfirmButton: false,
      timer: 2000
    })
  }

  /** Auxiliar que alerta en caso de que algo salga mal.*/
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

  /** Método encargado de cerrar el modal customer. */
  closeCustomerModal() {
    $('#customer_modal').modal('hide');
    this.submitted = false;
  }

  /** Método encargado de cerrar el modal customer. */
  closeRegionModal() {
    $('#region_modal').modal('hide');
    this.submitted = false;
  }

  /** Método encargado de cerrar el modal customer. */
  closeImageModal() {
    $('#image_modal').modal('hide');
    this.submitted = false;
  }

  /** Método cuando ocurra un cambio dentro del archivo de la imagen. */
  fileChangeEvent(event:any) {
    this.imageChangedEvent = event;
  }

  /** 
   * Para este punto ya se seleccionó la imagen, por la que la debemos de pasar a base 64 y se asigna
   * a objeto Image
   */
  imageCropped(event: CroppedEvent) {
    this.base64 = event.base64;
    this.image.image = this.base64;
  }

}
