import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../AuthServices/auth-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public auth:AuthServiceService) { }

  ngOnInit() {
  }
  logout(){
    this.auth.logout();
  }

}
