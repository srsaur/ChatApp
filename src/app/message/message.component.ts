import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { AuthServiceService } from '../AuthServices/auth-service.service';
import { SignalRService } from '../AuthServices/signalR.service';
import { NotificationService } from '../AuthServices/notification.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public msgService:MessageService,private signalR:SignalRService,private noti:NotificationService) {  }

  ngOnInit() {
    this.notify();
  }

notify(){
  let self= this;
    self.signalR._hubConnection.on("GetNotify",(obj)=>{
      self.noti.showNotification(obj.message);
    }
  )
}
Invoke(){
  let self= this;
  self.signalR._hubConnection.invoke("NotificationSent").then(e=>{});
}

}
