import { Component, OnInit } from '@angular/core';
import { Region } from './../../_model/region';
import { RegionService } from './../../_service/region.service';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  regions: Region[] = [];
  region: Region = new Region;
  formulario = this.formBuilder.group({
    id_region: [''],
    region: ['', Validators.required]
  })
  postRegion: boolean = false;
  submitted: boolean = false; 

  constructor(
    private regionService: RegionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getRegions();
  }

  /**
   * Obtener todas las regiones. 
  */
  getRegions() {
    this.regionService.getRegions().subscribe(
      res => {
        this.regions = res;
        console.log(this.regions);
      },
      err => console.log(err)
    );
  }

  /**
   * Obtener una sola región por medio del id de la región.
   * @param id_region 
   */
  getRegion(id_region:number) {
    this.regionService.getRegion(id_region).subscribe(
      res => {
        this.region = res;
        console.log(this.region);
      },
      err => console.log(err)
    )
  }

  /**
   * Método que se va a llamar cuando el formulario se ejecute
   */
  onSubmit() {
    this.submitted = true;
    setTimeout(() => {
      if (this.postRegion == true) {
      this.regionService.createRegion(this.formulario.value).subscribe(
        () => {
          console.log(this.regions);
          this.getRegions();
          this.closeModal();
          this.successAlert();
        },
        err => {
          console.log(err);
          this.failedAlert();
        }
      );
    } else {
      this.regionService.updateRegion(this.formulario.value).subscribe(
        () => {
          console.log(this.regions);
          this.getRegions();
          this.closeModal();
          this.successAlert();
        },
        err => {
          console.log(err);
          this.failedAlert();
        }
      );
    }
    }, 100);
    
  }

  /**
   * Método para aparecer el modal encargado de crear región.
   */
  createRegion() {
    this.postRegion = true;
    this.formulario.reset();
    $('#regionModal').modal('show');
  }

  /**
   * Método para aparecer el modal encargado de actualizar una región.
   * @param region 
   */
  updateRegion(region: Region) {
    this.postRegion = false;
    this.formulario.controls['id_region'].setValue(region.id_region);
    this.formulario.controls['region'].setValue(region.region);
    $('#regionModal').modal('show');
  }

  /**
   * Elimina una región por medio del id de la región.
   * @param id_region 
   */
  deleteRegion(id_region:number) {
    Swal.fire({
      title: '¿Seguro que deseas eliminar la región?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.regionService.deleteRegion(id_region).subscribe(
          () => {
            console.log(this.region);
            this.getRegions();
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
   * Método que se encarga de actualizar la lista de regiones.
   */
  refreshRegions() {
    this.getRegions();
  }

  /**
   * Método para mandar un mensaje de alerta de que se ha registró o actualizó exitosamente.
   */
  successAlert() {
    if (this.postRegion) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro exitoso!',
        showConfirmButton: false,
        timer: 2000
      }) 
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Actualización exitosa!',
        showConfirmButton: false,
        timer: 2000
      }) 
    }
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
    $('#regionModal').modal('hide');
    this.submitted = false;
  }
}
