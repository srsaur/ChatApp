import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snakBar:MatSnackBar) { }

  showNotification(message){
    this.snakBar.open(message,'',{
      duration: 2000
  });
}
}
