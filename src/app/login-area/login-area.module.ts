import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { HelpComponent } from '../help/help.component';
import { LoginRoutingModule } from '../login-routing.module';
import { MaterialModule } from '../material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginAreaComponent } from '../login-area/login-area.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HelpComponent,LoginComponent, RegisterComponent, LoginAreaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LoginAreaModule { }
