// models/notification.model.ts
export interface AppNotification {
  id: number;
  title: string;
  message: string;
  date: Date;
  lue: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}