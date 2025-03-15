import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../core/interfaces/profile_user';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../../shared/components/change-password/change-password.component';
import { LogoutDialogComponent } from '../../../shared/components/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userCurrent: User | null = null;
  constructor(private _userService: UsersService, private dialog: MatDialog) {
    this._userService.user$.subscribe((user) => {
      this.userCurrent = user;
    });
  }

  ngOnInit() {
    this.getCurrentUser();
  }
  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordComponent, {
      width: '500px',
    });
  }
  openLogoutDialog(): void {
      this.dialog.open(LogoutDialogComponent, {
        width: '500px', // Adjust width if needed
      });
    }
  getCurrentUser() {
    this._userService.getUser();
  }
  getImageUser(imagePath: string | null | undefined): string {
    const baseUrl = 'https://upskilling-egypt.com:3006/';
    return `${baseUrl}${imagePath}`;
  }
}
