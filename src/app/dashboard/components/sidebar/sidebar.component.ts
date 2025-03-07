import { Component, OnInit } from '@angular/core';
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
  menuList: Menu[] = [
    {
      name: 'home',
      icon: 'home',
      route: '/dashboard/home',
    },
    {
      name: 'Users',
      icon: 'group',
      route: '/dashboard/Users',
      isAdmin:true
    },
    {
      name: 'Recipes',
      icon: 'grid_view',
      route: 'admin/recipes',
      isAdmin:true
    },
    {
      name: 'Categories',
      icon: 'event_note',
      route: '/dashboard/Categories',
      isAdmin:true
    },
    {
      name: 'Change Password',
      icon: 'lock_open',
      route: '/dashboard/Change Password',
      isAdmin:true
    },
    {
      name: 'Logout',
      icon: 'logout',
      route: '/dashboard/Change Password',
      
    },
  ];
  constructor() {}

  ngOnInit() {}
}
