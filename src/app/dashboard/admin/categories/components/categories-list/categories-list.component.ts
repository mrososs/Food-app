import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { User, UserResponse } from '../../../../../core/interfaces/users';
import { UsersListService } from '../../../users/services/usersList.service';
import { CategoriesService } from '../../services/categories.service';
import {
  ICategoryList,
  PaginatedCategoryResponse,
} from '../../../../../core/interfaces/category';
import { CategoryDialogComponent } from '../../../../../shared/components/category-dialog/category-dialog.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  displayedColumns = ['Name', 'CreationDate', 'ModificationDate', 'actions'];
  categoriesService = inject(CategoriesService);
  categories$ = this.categoriesService.categoriesList$;
  paramsData = {
    pageSize: 10,
    pageNumber: 0,
  };
  totalNumberOfRecords!: number;
  dataSource: ICategoryList[] = [];
  noData = false;
  pagesNumber!: number;

  private destroy$ = new Subject<void>(); // 🚀 Unsubscribe handler

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getUsersList();
    this.subscribeToUsers();
  }

  getUsersList(): void {
    this.categoriesService.getCategoriesList(
      this.paramsData.pageNumber,
      this.paramsData.pageSize
    );
  }
  openDialog(mode: 'view' | 'edit' | 'delete', id?: number): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: {
        mode,
        id,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getUsersList();
    });
  }
  subscribeToUsers(): void {
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: PaginatedCategoryResponse | null) => {
        if (response?.data?.length) {
          this.dataSource = response.data;
          this.totalNumberOfRecords = response.totalNumberOfRecords;
          this.pagesNumber = response.totalNumberOfPages;
          this.noData = false;
        } else {
          this.noData = true;
          this.dataSource = [];
        }
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.noData = true;
        this.dataSource = [];
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
