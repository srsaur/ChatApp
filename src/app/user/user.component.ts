import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../AuthServices/notification.service';
import { AppSetting } from '../AppSetting';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private client:HttpClient,private notify:NotificationService) { }

  dataSource:any[]=[];
  ngOnInit() {
    this.GetUser();
  }

  GetUser(){
    let self=this;
    self.client.get(AppSetting.apiUrl+'api/user/getAppUsers')
                .subscribe( (e:any)=>self.dataSource=e.result);
  }
  
  sendMessage(toUserId){
    let self= this;
      var message={
        text:'hiii',
        toUserId:toUserId
      }

      self.client.post(AppSetting.apiUrl+"api/message/sendMessage",message)
                .subscribe(()=>{
                    self.notify.showNotification("Message Sent Successfully");        
                })
  }
  
}



