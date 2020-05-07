import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private auth:AuthServiceService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.auth.isValidToken()){
         this.auth.logout();
         return false;
    }
    if(!this.auth.signalR._connectionActive){
      this.auth.signalR.ConnectionOn();
    }
    return true;
  }
}
