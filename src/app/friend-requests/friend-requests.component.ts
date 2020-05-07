import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../AuthServices/notification.service';
import { AppSetting } from '../AppSetting';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {

  
  constructor(private client:HttpClient,private notify:NotificationService) { }

  dataSource:any[]=[];
  ngOnInit() {
    this.GetUser();
  }

  GetUser(){
    let self=this;
    self.client.get(AppSetting.apiUrl+'api/friendRequest/getFriendRequest')
                .subscribe( (e:any)=>self.dataSource=e.result);
  }
  
  sendRequest(data){
    let self= this;
    self.client.get(AppSetting.apiUrl+"api/FriendRequest/AcceptFriendRequest?toUser="+data.userID)
              .subscribe(()=>{
                  self.notify.showNotification("friendRequest Accept Successfully");  
                  data.isAccepted=true;      
              })
  }


}
