import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionModule } from './question/question.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './AuthServices/token-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ChatPopUpComponent } from './chat-pop-up/chat-pop-up.component';

export function getTokenString(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ChatPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    QuestionModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
         tokenGetter:getTokenString
      }
    })
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents:[ChatPopUpComponent]
})
export class AppModule { 

  

}

