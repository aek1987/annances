import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent {
 showDropdowns: boolean = false; // false = caché, true = visible

  toggleDropdowns() {
    this.showDropdowns = !this.showDropdowns;
  }
}
