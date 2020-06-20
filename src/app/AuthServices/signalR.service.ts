import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { AppSetting } from '../AppSetting';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  public _hubConnection: HubConnection;
  public _connectionActive: boolean = false;
  public onlineUser: string[] = [];
  private _user: any = this.Auth.decodeToken();
  public get user(): any {
    return this._user;
  }
  public set user(value: any) {
    this._user = value;
  }
  public notifications = [];
  public constructor(public Auth: JwtHelperService) {

  }

  public async ConnectionOn() {
    let self = this;
    if (!self._connectionActive) {
      self._hubConnection = new HubConnectionBuilder()
        .withUrl(AppSetting.apiUrl + 'chatApp', { accessTokenFactory: self.Auth.tokenGetter, logger: LogLevel.None })
        .build();

      // MainHub Start
      await self._hubConnection.start();
      self._connectionActive = true;
      await self.getOnlineUsers();
      self._hubConnection.on("updateOnlineUser", async (e) => await self.getOnlineUsers())
      await self.getNotifications();

      self._hubConnection.onclose(() => {
        self._connectionActive = false;
      })

    }
  }

  async getOnlineUsers() {
    this.onlineUser = await this._hubConnection.invoke("GetOnlineUsers")
  }

  async getNotifications() {
    this.notifications = await this._hubConnection.invoke("GetNotifcationsAsync")
  }

  isOnline(userId: string) {
    return this.onlineUser.some(e => e == userId);
  }

}
