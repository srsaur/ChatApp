import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { HerosComponent } from '../heros/heros.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessageComponent } from '../message/message.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MessageService } from '../message.service';
import { HeroService } from '../hero-service.service';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { CustomPipe } from '../CustomPipe/genderPipe';
import { UserChatComponent } from '../user-chat/user-chat.component';
import { FriendListComponent } from '../friend-list/friend-list.component';
import { ProfileComponent } from '../profile/profile.component';
import { AcceptedFriendsComponent } from '../accepted-friends/accepted-friends.component';
import { FriendRequestsComponent } from '../friend-requests/friend-requests.component';
import { ChatPopUpComponent } from '../chat-pop-up/chat-pop-up.component';

@NgModule({
  declarations: [
    HerosComponent,
    HeroDetailComponent,
    MessageComponent,
    DashboardComponent,
    LayoutComponent,
    UserComponent,
    UserChatComponent,
    CustomPipe,
    FriendListComponent,
    ProfileComponent,
    AcceptedFriendsComponent,
    FriendRequestsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule
  ],
  providers:[MessageService,HeroService]
})
export class LayoutModuleModule { }
