import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
interface Menu {
  name: string;
  icon: string;
  route: string;
  isAdmin?: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() collapsedChange = new EventEmitter<boolean>();
  isCollapsed = false;
  menuList: Menu[] = [
    {
      name: 'home',
      icon: 'home',
      route: '/dashboard/home',
    },
    {
      name: 'Users',
      icon: 'group',
      route: 'admin/users',
      isAdmin: true,
    },
    {
      name: 'Recipes',
      icon: 'grid_view',
      route: 'admin/recipes',
      isAdmin: true,
    },
    {
      name: 'Categories',
      icon: 'event_note',
      route: 'admin/categories',
      isAdmin: true,
    },
    {
      name: 'Change Password',
      icon: 'lock_open',
      route: '/dashboard/Change Password',
      isAdmin: true,
    },
    {
      name: 'Logout',
      icon: 'logout',
      route: '/dashboard/Change Password',
    },
  ];
  private platForm = inject(PLATFORM_ID);
  constructor() {}

  ngOnInit() {
    if (isPlatformBrowser(this.platForm)) {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) {
        this.isCollapsed = savedState === 'true';
        this.collapsedChange.emit(this.isCollapsed);
      }
    }
  }
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    // Save state to localStorage
    localStorage.setItem('sidebarCollapsed', this.isCollapsed.toString());
    this.collapsedChange.emit(this.isCollapsed);
  }
}
