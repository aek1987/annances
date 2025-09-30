import { Component } from '@angular/core';

@Component({
  selector: 'app-aide-support',
  templateUrl: './aide-support.component.html',
  styleUrls: ['./aide-support.component.css']
})
export class AideSupportComponent {
contactSupport() {
    // 👉 Redirige vers ton adresse email de support
    window.location.href = "mailto:support@monapp.com?subject=Aide%20et%20Support";
  }
}
