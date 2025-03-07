import { ICategoryList, PaginatedCategoryResponse } from './../../../../../core/interfaces/category';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FoodItem,
  PaginatedFoodResponse,
} from '../../../../../core/interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../../../../../shared/components/add-dialog/add-dialog.component';
import { SharedService } from '../../../../../shared/services/shared.service';
import { ITagList } from '../../../../../core/interfaces/tags';
import { ToastrService } from 'ngx-toastr';

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
  tagList!: ITagList[];
  categoryList!: ICategoryList[];
  dataSource: FoodItem[] = [];
  noData = false;
  searchForm!: FormGroup;
  fb = inject(FormBuilder);
  constructor(
    private recipeService: RecipeService,
    public dialog: MatDialog,
    private _toasterService: ToastrService,
    private _sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.getLookUp();
    this.searchForm = this.fb.group({
      name: [''],
      tag: [''],
      category: [''],
    });
    this.searchForm
      .get('name')
      ?.valueChanges.pipe(
        debounceTime(500), // Wait 500ms after typing stops
        distinctUntilChanged() // Only trigger if the value actually changes
      )
      .subscribe((value) => {
        this.getRecipes(value);
      });
    this.getRecipes();
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
  getRecipes(name?: string) {
    this.recipeService
      .getRecipes(10, 1, name)
      .pipe(take(1))
      .subscribe((response: PaginatedFoodResponse) => {
        this.dataSource = response.data;
        if (response.data.length === 0) {
          this.noData = true;
        }
      });
  }
  getLookUp() {
    this._sharedService.getTagList().subscribe({
      next: (res: ITagList[]) => {
        this.tagList = res;
      },
      error: (err) => {
        this._toasterService.error('error in tag List');
      },
    });
    this._sharedService.getCategoryList(1, 10).subscribe({
      next: (res: PaginatedCategoryResponse) => {
        console.log('Category List API Response:', res);
        if (Array.isArray(res)) {
          this.categoryList = res; // ✅ Assign if it's an array
        } else {
          this.categoryList = res.data || []; // ✅ Extract from paginated response
        }
      },
      error: (err) => {
        this._toasterService.error('Error fetching category list');
      },
    });
  }
}
