import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../AuthServices/signalR.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public signal:SignalRService) { }

  ngOnInit() {
  }

}
