import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../AuthServices/notification.service';
import { AppSetting } from '../AppSetting';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

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
  
  sendRequest(data){
    let self= this;
    var message={
      RequestedFromId:'',
      RequestedToId:data.id
    }

    self.client.post(AppSetting.apiUrl+"api/FriendRequest/sendRequest",message)
              .subscribe(()=>{
                  self.notify.showNotification("friendRequest Sent Successfully");  
                  data.isSend=true;      
              })
  }

}