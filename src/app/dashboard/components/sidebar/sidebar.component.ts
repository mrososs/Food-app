import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../../shared/components/logout-dialog/logout-dialog.component';
import { ChangePasswordComponent } from '../../../shared/components/change-password/change-password.component';
interface Menu {
  name: string;
  icon: string;
  route?: string;
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
      isAdmin: true,
    },
    {
      name: 'Logout',
      icon: 'logout',
    
    },
  ];
  private platForm = inject(PLATFORM_ID);
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platForm)) {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) {
        this.isCollapsed = savedState === 'true';
        this.collapsedChange.emit(this.isCollapsed);
      }
    }
  }
  openLogoutDialog(): void {
    this.dialog.open(LogoutDialogComponent, {
      width: '400px', // Adjust width if needed
    });
  }
  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordComponent, {
      width: '500px',
    });
  }
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    // Save state to localStorage
    localStorage.setItem('sidebarCollapsed', this.isCollapsed.toString());
    this.collapsedChange.emit(this.isCollapsed);
  }
}
