import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignalRService } from '../AuthServices/signalR.service';
import { AppSetting } from '../AppSetting';

@Component({
  selector: 'app-chat-pop-up',
  templateUrl: './chat-pop-up.component.html',
  styleUrls: ['./chat-pop-up.component.css']
})
export class ChatPopUpComponent implements OnInit {
  

  @ViewChild('ChatDiv') private scrollContainer: ElementRef
  
  userChat:Array<any>;

  selectedUser:string;
  currentUser;
  isTyping=false;

  constructor(private client:HttpClient,private token:JwtHelperService,public signalR:SignalRService,public dialogRef: MatDialogRef<ChatPopUpComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.currentUser=this.token.decodeToken().sid;
    this.getUserChat();
    this.messageBind();   
    this.typingBind(); 
  }



  getUserChat(){
    let self= this;
    self.selectedUser=self.data.userID;
    self.client.get('http://localhost:5000/api/message/GetMessages?toUser='+self.selectedUser)
                    .subscribe((res:any)=>{
                        self.userChat=res.result;
                        self.scrollToBottom();
                    });
  }

  sendMessage(msg){
    let self= this;
      var message={
        text:msg,
        toUserId:self.selectedUser
      }

      self.client.post(AppSetting.apiUrl+"api/message/sendMessage",message)
                .subscribe();
  }

  messageBind(){
    let self= this;
    self.signalR._hubConnection.on("GetNotify",(obj)=>{
      if(self.selectedUser==obj.toUserId||self.selectedUser==obj.fromUserId){
       self.userChat.push(obj);
      }
       self.scrollToBottom();
    });
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      });
    } catch(err) { }                 
}

notify(e){
  let self= this;
  self.signalR._hubConnection.invoke("notify",self.selectedUser);
  if(e.keyCode==13){
    if(!!e.target.value.trim()){
      self.sendMessage(e.target.value);
      e.target.value='';
    }
  }
}

typingBind(){
  let self= this;
  self.signalR._hubConnection.on("typing",(obj)=>{
     if(self.selectedUser==obj){
       if(self.isTyping=true){
       self.isTyping=true;
       setTimeout(() => {
        self.isTyping=false
      }, 3000);
     }
    }
  })
}

close(){
  this.dialogRef.close();
}

}
