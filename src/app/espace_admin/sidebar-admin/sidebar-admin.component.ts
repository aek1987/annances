import { Component } from '@angular/core';
import { faTachometerAlt, faUsers, faBriefcase, faFileAlt, faBell, faCog, faLifeRing } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent {
  faTachometerAlt = faTachometerAlt;
  faUsers = faUsers;
  faBriefcase = faBriefcase;
  faFileAlt = faFileAlt;
  faBell = faBell;
  faCog = faCog;
  faLifeRing = faLifeRing;
}
