import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  entryComponents: [
    LoginFormComponent
  ],
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    LoginFormComponent
  ]
})
export class ComponentsModule { }
