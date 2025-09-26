import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidebar-entreprise',
  templateUrl: './sidebar-entreprise.component.html',
  styleUrls: ['./sidebar-entreprise.component.css']
})
export class SidebarEntrepriseComponent {

   constructor(
       private authService: AuthService) {
  
    }
  
ngOnInit(): void {
  this.authService.currentUser$.subscribe(user => {
    //this.currentUser = user;
  });
}

}
