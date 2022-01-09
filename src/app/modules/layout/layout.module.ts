import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component'
import { RegionComponent } from './../customer/components/region/region.component';
import { ExchangeRateComponent } from './../exchange-rate/components/exchange-rate/exchange-rate.component';
import { CategoryComponent } from './../product/components/category/category.component';
import { ShowProductsComponent } from './../home/components/show-products/show-products.component';
import { CustomerDetailComponent } from './../customer/components/customer-detail/customer-detail.component';
import { CustomerComponent } from './../customer/components/customer/customer.component';
import { ProductDetailComponent } from './../product/components/product-detail/product-detail.component';
import { ProductComponent } from './../product/components/product/product.component';

const routes: Routes = [
  {path: 'exchange-rate', component: ExchangeRateComponent},
  {path: 'region', component:RegionComponent},
  {path: '', component: ShowProductsComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'customer-detail/:rfc', component: CustomerDetailComponent},
  {path: 'product', component: ProductComponent},
  {path: 'product-detail/:gtin', component: ProductDetailComponent}
];

@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
