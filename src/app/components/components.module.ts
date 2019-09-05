import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { SalesChartComponent } from './sales-chart/sales-chart.component';



@NgModule({
  entryComponents: [
    LoginFormComponent
  ],
  declarations: [
    LoginFormComponent,
    ProductsComponent,
    SalesChartComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    LoginFormComponent,
    ProductsComponent,
    SalesChartComponent
  ]
})
export class ComponentsModule { }
