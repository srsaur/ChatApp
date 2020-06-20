import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  public _hubConnection: HubConnection;
  public _connectionActive: boolean = false;
  constructor() { }
  async ConnectToApp(url, userId) {
    let self = this;
    try {
      self._hubConnection = new HubConnectionBuilder()
        .withUrl(url + 'notification')
        .build();
      await self._hubConnection.start();
      console.log('Started Connection');
      await self._hubConnection.invoke("ConnectionAddAsync", userId);
      self._connectionActive = true;
      self._hubConnection.onclose(() => {
        self._connectionActive = false;
      });
    }
    catch {
      setTimeout(self.ConnectToApp, 2000);
    }
  }
  getNotification(e) {
    if (this._hubConnection) {
      this._hubConnection.on("GetNotification", e);
    }
  }
  async stopConnection() {
    if (this._connectionActive) {
      await this._hubConnection.stop();
    }
  }
}
