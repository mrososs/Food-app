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
  isAdmin = false;
  isCollapsed = false;
  menuList: Menu[] = [];

  // Define all possible menu items
  private allMenuItems: Menu[] = [
    {
      name: 'home',
      icon: 'home',
      route: '/dashboard/home',
      // No isAdmin property means show for both
    },
    {
      name: 'Users',
      icon: 'group',
      route: 'admin/users',
      isAdmin: true, // Only for admins
    },
    {
      name: 'Recipes',
      icon: 'grid_view',
      route: 'admin/recipes',
      isAdmin: true, // Only for admins
    },
    {
      name: 'Recipes',
      icon: 'grid_view',
      route: 'user/user-recipes',
      isAdmin: false, // Only for non-admins
    },
    {
      name: 'Favorites',
      icon: 'favorite',
      route: 'user/fav-recipes',
      isAdmin: false, // Only for non-admins
    },
    {
      name: 'Categories',
      icon: 'event_note',
      route: 'admin/categories',
      isAdmin: true, // Only for admins
    },
    {
      name: 'Change Password',
      icon: 'lock_open',
      isAdmin: true,
      // No isAdmin property means show for both
    },
    {
      name: 'Logout',
      icon: 'logout',
      // No isAdmin property means show for both
    },
  ];

  private platForm = inject(PLATFORM_ID);

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platForm)) {
      const role = localStorage.getItem('role');
      const savedState = localStorage.getItem('sidebarCollapsed');

      if (savedState) {
        this.isCollapsed = savedState === 'true';
        this.collapsedChange.emit(this.isCollapsed);
      }

      // Set isAdmin based on role
      this.isAdmin = role !== 'SystemUser';

      // Filter menu items based on isAdmin value
      this.filterMenuItems();
    }
  }

  // Filter menu items based on admin status
  private filterMenuItems(): void {
    this.menuList = this.allMenuItems.filter((item) => {
      // If isAdmin is undefined, show for both admin and non-admin
      if (item.isAdmin === undefined) {
        return true;
      }
      // Otherwise, only show if isAdmin matches the user's admin status
      return item.isAdmin === this.isAdmin;
    });
  }

  openLogoutDialog(): void {
    this.dialog.open(LogoutDialogComponent, {
      width: '400px',
    });
  }

  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordComponent, {
      width: '500px',
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    // Save state to localStorage (fixed to save the actual boolean value as string)
    localStorage.setItem('sidebarCollapsed', this.isCollapsed.toString());
    this.collapsedChange.emit(this.isCollapsed);
  }
}
