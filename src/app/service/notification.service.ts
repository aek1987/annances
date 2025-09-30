import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppNotification } from '../modeles/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: AppNotification[] = [];
  // CORRECTION ICI : Utiliser AppNotification[] au lieu de Notification[]
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  
  public notifications$ = this.notificationsSubject.asObservable();

  ajouterNotification(notification: Omit<AppNotification, 'id' | 'date' | 'lue'>) {
    const nouvelleNotification: AppNotification = {
      id: Date.now(),
      date: new Date(),
      lue: false,
      ...notification
    };
    
    this.notifications.unshift(nouvelleNotification);
    this.notificationsSubject.next([...this.notifications]);
  }

  marquerCommeLue(id: number) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.lue = true;
      this.notificationsSubject.next([...this.notifications]);
    }
  }

  supprimerNotification(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notificationsSubject.next([...this.notifications]);
  }

  getNombreNonLues(): number {
    return this.notifications.filter(n => !n.lue).length;
  }
}