import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignalRService } from '../AuthServices/signalR.service';
import { AppSetting } from '../AppSetting';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css'],
  host: {
    '(window:resize)': 'onResize()'
  }
})

export class UserChatComponent implements OnInit {

  @ViewChild('ChatDiv') private scrollContainer: ElementRef

  recentChat:Array<any>;
  userChat:Array<any>;

  selectedUser:any;
  currentUser;

  recentSection=true;
  chatSection=true;

  isMobile=false;

    onResize() {
     let self=this;
         if(window.innerWidth<=767)
         {
           self.isMobile=true;
           self.recentSection=true,
           self.chatSection=false;
         }
         else{
           self.isMobile=false;
           self.recentSection=true,
           self.chatSection=true;
         }
    }

  constructor(private client:HttpClient,private token:JwtHelperService,public signalR:SignalRService) { 
     
  }
  

  
  ngOnInit() {
    this.onResize();
    this.currentUser=this.token.decodeToken().sid;
    this.recentChatBind();
    this.messageBind();   
    this.typingBind(); 
  }

  recentChatBind(){
      let self =this;
      self.client.get("http://localhost:5000/api/message/RecentChat")
      .subscribe((res:any)=>{
         self.recentChat= res.result;
         if(!self.isMobile){
         self.getUserChat(self.recentChat[0]);
         }
      });
  }


  getUserChat(user){
    let self= this;
    self.selectedUser=user;
    self.client.get('http://localhost:5000/api/message/GetMessages?toUser='+self.selectedUser.userId)
                    .subscribe((res:any)=>{
                        self.userChat=res.result;
                        self.scrollToBottom();
                        if(self.isMobile){
                           self.chatSection=true;
                           self.recentSection=false
                        }
                    });
  }

  sendMessage(msg){
    let self= this;
      var message={
        text:msg,
        toUserId:self.selectedUser.userId
      }

      self.client.post(AppSetting.apiUrl+"/api/message/sendMessage",message)
                .subscribe();
  }

  messageBind(){
    let self= this;
    self.signalR._hubConnection.on("GetNotify",(obj)=>{
      if(!!self.selectedUser && (self.selectedUser.userId==obj.toUserId||self.selectedUser.userId==obj.fromUserId)){
       self.userChat.push(obj);
      }
        var user=self.recentChat.find(e=>e.userId==obj.fromUserId ||e.userId==obj.toUserId);
        if(user){
        user.createdOn=obj.createdOn;
        user.message=obj.text;
        }
        else{
            self.recentChat.push({userId:obj.fromUserId,userName:obj.userName,message:obj.text,createdOn:obj.createdOn})
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
  self.signalR._hubConnection.invoke("notify",self.selectedUser.userId);
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
    self.recentChat.find(e=>e.userId==obj).isTyping=true
    setTimeout(() => {
      self.recentChat.find(e=>e.userId==obj).isTyping=false
    }, 3000);
  })
}

 close(){
   this.selectedUser=null;
   this.recentSection=true,
   this.chatSection=false;
 }

}
