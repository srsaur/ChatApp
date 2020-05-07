import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../AuthServices/notification.service';
import { MatDialog } from '@angular/material';
import { ChatPopUpComponent } from '../chat-pop-up/chat-pop-up.component';
import { AppSetting } from '../AppSetting';

@Component({
  selector: 'app-accepted-friends',
  templateUrl: './accepted-friends.component.html',
  styleUrls: ['./accepted-friends.component.css']
})
export class AcceptedFriendsComponent implements OnInit {

  constructor(private client:HttpClient,private notify:NotificationService,private dialog:MatDialog) { }

  dataSource:any[]=[];
  ngOnInit() {
    this.GetUser();
  }

  GetUser(){
    let self=this;
    self.client.get(AppSetting.apiUrl+'api/friendRequest/getFriends')
                .subscribe( (e:any)=>self.dataSource=e.result);
  }

  openMessageDialog(data){
   const dialogRef= this.dialog.open(ChatPopUpComponent,{
     disableClose:true,
     data:data,
     position:{top:'80px'},
     height: '80vh',
     width: '600px'
   });
  }

}
