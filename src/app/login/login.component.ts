import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from '../AuthServices/signalR.service';
import { NotificationService } from '../AuthServices/notification.service';
import { AppSetting } from '../AppSetting';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm=this.form.group({
      'email':[''],
      'password':['']
  });

  constructor(private route:Router,private form:FormBuilder,private client:HttpClient,private signalr:SignalRService) { }

  ngOnInit() {
  }

  login():void{
  let self=this;

  self.client.post(AppSetting.apiUrl+"api/account/signIn",self.loginForm.value)
              .subscribe((res:any)=>{
                  localStorage.setItem('token',res.result)
                  self.signalr.user=this.signalr.Auth.decodeToken();
                  self.route.navigate(['/']);
                  self.signalr.ConnectionOn();
              });
  }

  
}
