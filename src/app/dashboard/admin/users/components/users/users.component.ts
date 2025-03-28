import { Component, inject, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { PageEvent } from '@angular/material/paginator';
import { UsersListService } from '../../services/usersList.service';
import { User, UserResponse } from '../../../../../core/interfaces/users';
@Component({
  selector: 'app-users',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.scss'],
})
export class UsersListComponent implements OnInit {
  displayedColumns = [
    'Name',
    'email',
    'country',
    'phoneNumber',
    'Image',
    'group',
    'creationDate',
    'actions',
  ];
  usersService = inject(UsersListService);
  users$ = this.usersService.users$;
  paramsData = {
    pageSize: 10,
    pageNumber: 0,
  };
  totalNumberOfRecords!: number;
  dataSource: User[] = [];
  noData = false;
  pagesNumber!: number;

  private destroy$ = new Subject<void>(); // 🚀 Unsubscribe handler

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getUsersList();
    this.subscribeToUsers();
  }
  getImageUrl(imagePath: string): string {
    const baseUrl = 'https://upskilling-egypt.com:3006/'; // ✅ تأكد أن هذا هو الـ base URL الصحيح
    return `${baseUrl}${imagePath}`;
  }
  getUsersList(): void {
    this.usersService.getUsersList(
      this.paramsData.pageNumber,
      this.paramsData.pageSize
    );
  }
  subscribeToUsers(): void {
    this.usersService.users$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: UserResponse | null) => {
       
        if (response && response.data) {
          this.dataSource = response.data;
          this.totalNumberOfRecords = response.totalNumberOfRecords;
          this.pagesNumber = response.totalNumberOfPages;
          this.noData = response.data.length === 0;
        } else {
          this.noData = true;
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.noData = true;
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); // ✅ Clean up subscriptions
  }

  onPageChange(event: PageEvent): void {
    this.paramsData.pageNumber = event.pageIndex;
    this.paramsData.pageSize = event.pageSize;
    this.getUsersList();
  }
}
