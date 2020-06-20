import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HelpComponent } from './help/help.component';
import { LoginAreaComponent } from './login-area/login-area.component';

const routes:Routes=[
  {
    path:'',
    component:LoginAreaComponent
   ,children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
]},

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class LoginRoutingModule { }
