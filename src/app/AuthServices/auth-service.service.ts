import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignalRService } from './signalR.service';
import { NotifyService } from "./NotifyService";


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private route:Router,public signalR:SignalRService,private notify:NotifyService) { }

  isValidToken():boolean{
    return !this.signalR.Auth.isTokenExpired();
    }

  async logout(){
    await this.route.navigate(['/account/login']);
     this.clearLocalStorage();
     this.signalR.user=null;
     if(this.signalR._connectionActive){
     await this.signalR._hubConnection.stop();
     await this.notify.stopConnection();
     }
  }

  clearLocalStorage(){
    localStorage.clear();
  }
}
