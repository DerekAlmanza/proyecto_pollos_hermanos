import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-payment',
  templateUrl: './product-payment.component.html',
  styleUrls: ['./product-payment.component.css']
})
export class ProductPaymentComponent implements OnInit {

  formulario = this.formBuilder.group({
    name: ['', Validators.required],
    card_number: ['', Validators.required],
    fecha_expiracion: ['', Validators.required],
    cvv_cvc: ['', Validators.required]
  })
  submitted = false;

  estableceFecha(){
    //Nos ayuda a verificar que la fecha ingresada no sea menor a la actual.
    //conseguimos el mes en forma de cadena.
    let date: Date = new Date();
    let mes: number;
    let compara: string;
    if(date.getUTCMonth()+1 <= 10){
      mes = date.getUTCMonth()+1;
      compara = mes.toString();
    }else{
      mes = date.getUTCMonth()+1;
      compara = mes.toString();
    }
    console.log("mes actual en tipo numerico " + mes);
    //conseguimos el año en forma de cadena
    var anio: number;
    anio = date.getFullYear();
    var auxiliar: string;
    auxiliar = anio.toString();
    var aux2 :string;
    aux2 = auxiliar.substr(2,3);
    compara = compara + auxiliar.substr(2,3);
    console.log("fecha actual de tipo cadena" + compara);
    anio = parseInt(aux2);
    console.log("año actual en tipo numerico" + anio);
    //conseguimos fecha tipo "0000"
    var aux: string;
    aux = this.formulario.controls['fecha_expiracion'].value;
    console.log(aux);
    //obtenemos el año y lo parseamos a entero
    var subanio = aux.substr(2,3);
    console.log("año de entrada de tipo cadena " + subanio);
    var suba = parseInt(subanio);
    console.log("año de entrada tipo numerico" +suba);
    let caracter = aux.charAt(0);
    var caracter2: number;
    caracter2 = parseInt(caracter);
    if(caracter2 == 0){
      var submes: string;
      submes = aux.substr(1,1);
      console.log("mes de entrada tipo cadena " + submes);
      var submes2 = parseInt(submes);
      console.log("mes de entrada tipo numerico " + submes);
      console.log(typeof submes2);
    }else{
      submes = aux.substr(0,2);
      console.log("mes de entrada tipo cadena " + submes);
      var submes2 = parseInt(submes);
      console.log("mes de entrada tipo numerico " + submes);
      console.log(typeof submes2);
    }
    //primer caso el año de ingreso es mayor al actual
    if(suba > anio){
      console.log("devuelve 0");
      return 0;
    }else if(suba == anio){//tercer caso, el año de ingreso es igual al actual
      if(submes2 < mes){//el mes es menor al actual
        return -1;
      }else{//el mes es mayor al actual
        return 0;
      }
    }else{//if(suba < anio){ //segundo caso, el año de ingreso es menor al actual
      console.log("devuelve 1");
      return -1;
    }
  }

  onSubmit(){
    this.submitted = true;
    if (this.estableceFecha() == 0){
      this.successAlert();
    }else{
      console.log("error");
      this.failedAlert();
    }
    this.submitted = false;
    this.formulario.reset();
  }


  /**
  * Método para mandar un mensaje de alerta de que se ha registró o actualizó exitosamente.
  */
   successAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' Tarjeta válida!',
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
      text: 'Tarjeta Inválida',
    })
  }


  get f() {
    return this.formulario.controls;
  }
  diHola(){
    console.log("hola");
  }

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.diHola();
  }

}
