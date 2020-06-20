import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../AuthServices/auth-service.service';
import { NotificationService } from '../AuthServices/notification.service';
import * as moment from 'moment';
import { NotifyService } from "../AuthServices/NotifyService";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {

  bell: boolean = true;
  badgeCount = 0;

  constructor(public auth: AuthServiceService, private notification: NotificationService, private notyfy: NotifyService) { }

  ngOnInit() {
    this.getNotification();
  }
  async logout() {
    await this.auth.logout();
  }

  getNotification() {
    let self = this;
    self.auth.signalR._hubConnection.on("GetNotification", (e: any) => {
      self.auth.signalR.notifications.push(e);
      self.notification.showNotification("you got a notification");
      if (self.bell) {
        self.badgeCount += 1;
      }
    });

    self.notyfy.getNotification((e) => {
      self.notification.showNotification("you got a message");
      if (self.bell) {
        self.badgeCount += 1;
      }
    });

  }

  bellClick() {
    this.bell = !this.bell;
    this.badgeCount = 0;
  }
}
