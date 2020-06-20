import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NotificationService } from '../AuthServices/notification.service';
import { AppSetting } from '../AppSetting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('labelInput')
  labelInput:ElementRef;
  progress=0;
  img='';
  gender="before";
  builder=this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      address:[''],
      email:['',[Validators.email]],
      password:[null,[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      gender:['0'],
      dob:[new Date()],
      imagePath:['',[Validators.required]]
  })

  constructor(private formBuilder:FormBuilder,private client:HttpClient,private notify:NotificationService,private route:Router) { }

  ngOnInit() {
  }

  register():void{
    let self=this;

let data= new FormData();
    let formData=Object.assign({},self.builder.value);
    formData.dob=formData.dob.toDateString();
       self.client.post(AppSetting.apiUrl+"api/account",formData)
                       .subscribe(res=>{
                            self.notify.showNotification('Form Submit Successfully')
                            // self.builder.reset();
                            // self.labelInput.nativeElement.innerText="select file"
                            // self.img='';
                            self.route.navigate(['/account/login']);
                       });
  }

  onFileChange(files:FileList){
    let self=this;
      self.labelInput.nativeElement.innerText=Array.from(files).map(f=>f.name).join(',');
      let file=files.item(0);
      let data=new FormData();
      data.append('file',file,file.name)
      this.client.post(AppSetting.apiUrl+"api/upload",data,{reportProgress:true,observe:'events'})
         .subscribe((event:any)=>{
            if(event.type===HttpEventType.UploadProgress){
              self.progress=Math.round(100*event.loaded/event.total);
            }
            else if(event.type===HttpEventType.Response){
              self.img=AppSetting.apiUrl+`${event.body.result}`
              self.builder.controls['imagePath'].setValue(self.img);
            }
         });
  }

}
