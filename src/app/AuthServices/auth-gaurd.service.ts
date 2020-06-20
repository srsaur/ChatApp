import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

import { AppSetting } from '../AppSetting';
import { NotifyService } from "./NotifyService";

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private auth:AuthServiceService,private router:Router,private notify:NotifyService) { }
  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.auth.isValidToken()){
         this.auth.logout();
         return false;
    }
    if(!this.auth.signalR._connectionActive){
      this.auth.signalR.ConnectionOn();

    }
    if(!this.notify._connectionActive){
      this.notify.ConnectToApp(AppSetting.apiUrl,this.auth.signalR.user.sid);
    }
    return true;
  }
}
