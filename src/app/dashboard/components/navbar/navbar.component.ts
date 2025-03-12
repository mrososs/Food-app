import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../core/interfaces/profile_user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userCurrent: User | null = null;
  constructor(private _userService: UsersService) {
    this._userService.user$.subscribe((user) => {
      this.userCurrent = user;
    });
  }

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this._userService.getUser();
  }
  getImageUser(imagePath: string|null|undefined):string {
    const baseUrl = 'https://upskilling-egypt.com:3006/';
    return `${baseUrl}${imagePath}`;
  }
}
