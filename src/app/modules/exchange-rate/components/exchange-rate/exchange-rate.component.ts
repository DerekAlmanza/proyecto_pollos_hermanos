import { Component, OnInit } from '@angular/core';
import {ExchangeRate} from '../../_model/exchange-rate';
import {ExchangeRateService} from '../../_service/exchange-rate.service';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {

  exchangeRate = new ExchangeRate();
  formulario = this.formBuilder.group({
    rate: ['', Validators.required]
  });

  constructor(
    private exchangeRateService: ExchangeRateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getExchangeRate('USD');
  }

  ngSubmit() {
    
    var rate = this.formulario.controls['rate'].value;
    this.getExchangeRate(rate);
  }

  getExchangeRate (rate:string) {
    this.exchangeRateService.getExchangeRate(rate).subscribe(
      res => {
        this.exchangeRate = res;
      },
      err => {console.log(err);
      }
    ); // Subscribe hace una llamada de manera síncrona.
  }

}
