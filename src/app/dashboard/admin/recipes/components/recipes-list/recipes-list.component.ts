import {
  ICategoryList,
  PaginatedCategoryResponse,
} from './../../../../../core/interfaces/category';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FoodItem,
  PaginatedFoodResponse,
} from '../../../../../core/interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  merge,
  Subject,
  takeUntil,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../../../../../shared/components/add-dialog/add-dialog.component';
import { SharedService } from '../../../../../shared/services/shared.service';
import { ITagList } from '../../../../../core/interfaces/tags';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RecipesListComponent implements OnInit {
  displayedColumns = [
    'ItemName',
    'Image',
    'Price',
    'Description',
    'tag',
    'category',
    'actions',
  ];
  totalNumberOfRecords!: number;

  tagList!: ITagList[];
  categoryList!: ICategoryList[];
  dataSource: FoodItem[] = [];
  noData = false;
  searchForm!: FormGroup;
  pagesNumber!: number;
  intialPage = {
    pageNumber: 0,
    pageSize: 10,
  };
  private destroy$ = new Subject<void>(); // 🚀 Unsubscribe handler

  fb = inject(FormBuilder);
  constructor(
    private recipeService: RecipeService,
    public dialog: MatDialog,
    private _sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.getLookUp();
    this.searchForm = this.fb.group({
      name: [''],
      tag: [''],
      category: [''],
    });
    merge(
      this.searchForm
        .get('name')!
        .valueChanges.pipe(debounceTime(500), distinctUntilChanged()),
      this.searchForm.get('tag')!.valueChanges.pipe(distinctUntilChanged()),
      this.searchForm.get('category')!.valueChanges.pipe(distinctUntilChanged())
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const name = this.searchForm.get('name')!.value;
        const tag = this.searchForm.get('tag')!.value;
        const category = this.searchForm.get('category')!.value;
        this.getRecipes(name, tag, category); // ✅ Call API with updated values
      });

    this.getRecipes();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); // ✅ Clean up subscriptions
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '400px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('Dialog closed', res);
    });
  }
  onPageChange(event: PageEvent): void {
    this.intialPage.pageNumber = event.pageIndex;
    this.intialPage.pageSize = event.pageSize;
    this.getRecipes(
      this.searchForm.get('name')!.value,
      this.searchForm.get('tag')!.value,
      this.searchForm.get('category')!.value
    );
  }

  getRecipes(name?: string, tag?: string, category?: string): void {
    this.recipeService
      .getRecipes(
        this.intialPage.pageSize,
        this.intialPage.pageNumber,
        name,
        tag,
        category
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: PaginatedFoodResponse) => {
        this.dataSource = response.data;
        this.pagesNumber = response.totalNumberOfPages;
        this.totalNumberOfRecords = response.totalNumberOfRecords;

        this.noData = response.data.length === 0;
      });
  }
  getLookUp() {
    this._sharedService.getTagList().subscribe({
      next: (res: ITagList[]) => {
        this.tagList = res;
      },
      error: (err) => {
        // this._toasterService.error('error in tag List');
      },
    });
    this._sharedService.getCategoryList(1, 10).subscribe({
      next: (res: PaginatedCategoryResponse) => {
        console.log('Category List API Response:', res);
        this.categoryList = res.data || [];
      },
      error: (err) => {
        // this._toasterService.error('Error fetching category list');
      },
    });
  }
}
