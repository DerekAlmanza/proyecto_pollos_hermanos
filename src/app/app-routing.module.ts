import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRateComponent } from "../app/modules/exchange-rate/components/exchange-rate/exchange-rate.component";
import { RegionComponent } from './modules/customer/components/region/region.component';
import { HomeComponent } from './modules/home/home/home.component';
import { CategoryComponent } from './modules/product/components/category/category.component';

const routes: Routes = [
  {path: 'exchange-rate', component: ExchangeRateComponent},
  {path: 'region', component:RegionComponent},
  {path: '', component: HomeComponent},
  {path: 'category', component: CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
