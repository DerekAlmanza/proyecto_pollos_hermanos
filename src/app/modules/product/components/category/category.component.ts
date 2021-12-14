import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CategoryService } from '../../_service/category.service';
import { Category } from './../../_model/category';

import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:Category[] = [];
  category:Category =new Category;
  formulario = this.formBuilder.group({
    id_category: [''],
    category: ['', Validators.required]
  });
  postCategory:boolean = false;
  submitted:boolean = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Obtener todas las categorías. 
  */
  getCategories() {
    this.categoryService.getCategories().subscribe(
      res => this.categories = res,
      err => console.log(err)
    );
  }

  /**
   * Obtener una categoría a partir de su id. 
   * @param id_category
  */
   getCategory(id_category:number) {
    this.categoryService.getCategory(id_category).subscribe(
      res => this.category = res,
      err => console.log(err)
    );
  }

  onSubmit() {
    this.submitted = true;
    if(this.postCategory) {
      this.categoryService.createCategory(this.formulario.value).subscribe(
        () => {
          this.getCategories();
          this.closeModal();
          this.successAlert();
        },
        err => {
          console.log(err);
          this.failedAlert();
        }
      )
    } else {
      this.categoryService.updateCategory(this.formulario.value).subscribe(
        () => {
          this.getCategories();
          this.closeModal();
          this.successAlert();
        },
        err => {
          console.log(err);
          this.failedAlert();
        }
      );
    }
  }

  /**
   * Método para aparecer el modal encargado de crear categoría.
   */
  createCategory() {
    this.postCategory = true;
    this.formulario.reset();
    $('#categoryModal').modal('show');
  }

  /**
   * Método para aparecer el modal encargado de actualizar una región.
   * @param category 
   */
  updateCategory(category: Category) {
    this.postCategory = false;
    this.formulario.controls['id_category'].setValue(category.id_category);
    this.formulario.controls['category'].setValue(category.category);
    $('#categoryModal').modal('show');
  }

  /**
   * Elimina una categoría por medio del id de la categoría
   * @param id_category 
   */
  deleteCategory(id_category:number) {
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
        this.categoryService.deleteCategory(id_category).subscribe(
          () => {
            console.log(this.category);
            this.getCategories();
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
   * Método que se encarga de actualizar la lista de categorías.
   */
   refreshCategories() {
    this.getCategories();
  }

  /**
   * Método para mandar un mensaje de alerta de que se ha registró o actualizó exitosamente.
   */
   successAlert() {
    if (this.postCategory) {
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

  /** Método encargado de cerrar el modal */
  closeModal() {
    $('#categoryModal').modal('hide');
    this.submitted = false;    
  }

}
