import { Component, OnInit } from '@angular/core';

import { AppNotification } from '../../modeles/notification'; // Assurez-vous du bon chemin
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.css']
})
export class NotificationMenuComponent implements OnInit {
  faBell = faBell;
  notifications: AppNotification[] = []; // Type correct
  nombreNonLues = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notifications: AppNotification[]) => {
      this.notifications = notifications.slice(0, 5);
      this.nombreNonLues = this.notificationService.getNombreNonLues();
    });
  }

  supprimerNotification(id: number) {
    this.notificationService.supprimerNotification(id);
  }
}