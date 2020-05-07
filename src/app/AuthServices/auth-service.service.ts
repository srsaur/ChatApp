import { Injectable } from '@angular/core';
import{JwtHelperService} from '@auth0/angular-jwt'
import { Router } from '@angular/router';
import { SignalRService } from './signalR.service';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private route:Router,public signalR:SignalRService) { }

  isValidToken():boolean{
    return !this.signalR.Auth.isTokenExpired();
    }
  
  logout(){
     this.clearLocalStorage();
     this.signalR.user=null;
     if(this.signalR._connectionActive){
     this.signalR._hubConnection.stop();
     }
     this.route.navigate(['/account/login']);
  }

  clearLocalStorage(){
    localStorage.clear();
  }
}
