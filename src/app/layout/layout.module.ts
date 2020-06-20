import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HerosComponent } from '../heros/heros.component';
import { LayoutComponent } from './layout.component';
import { UserComponent } from '../user/user.component';
import { AuthGaurdService as AuthGuard } from '../AuthServices/auth-gaurd.service';
import { UserChatComponent } from '../user-chat/user-chat.component';
import { FriendListComponent } from '../friend-list/friend-list.component';
import { ProfileComponent } from '../profile/profile.component';
import { AcceptedFriendsComponent } from '../accepted-friends/accepted-friends.component';
import { FriendRequestsComponent } from '../friend-requests/friend-requests.component';
import { HelpComponent } from '../help/help.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate:[AuthGuard],
    children: [
      { path: 'home', component: HelpComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'details/:id', component: HeroDetailComponent },
      { path: 'heroes', component: HerosComponent },
      {
        path: 'profile', component: ProfileComponent,
        children:
          [
            { path: 'user', component: FriendListComponent },
            { path: 'friendsRequest', component: FriendRequestsComponent },
            {path:"friend",component:AcceptedFriendsComponent}
          ]
      },
      { path: 'user', component: UserComponent },
      { path: 'chat', component: UserChatComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutModule { }
