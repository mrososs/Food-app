import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import {
  Subject,
  merge,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';
import {
  ICategoryList,
  PaginatedCategoryResponse,
} from '../../../core/interfaces/category';
import {
  FoodItem,
  PaginatedFoodResponse,
} from '../../../core/interfaces/recipe';
import { ITagList } from '../../../core/interfaces/tags';
import { AddDialogComponent } from '../../../shared/components/add-dialog/add-dialog.component';
import { ViewRecipeDialogComponent } from '../../../shared/components/view-recipe-dialog/view-recipe-dialog.component';
import { SharedService } from '../../../shared/services/shared.service';
import { RecipeService } from '../../admin/recipes/services/recipe.service';
import { UserRecipesService } from '../user-recipes/services/user-recipes.service';
import { FavRecipesService } from './services/fav-recipes.service';
import {
  IFavRecipeItem,
  IFavRecipes,
} from '../../../core/interfaces/favRecipes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fav-recipes',
  templateUrl: './fav-recipes.component.html',
  styleUrl: './fav-recipes.component.scss',
})
export class FavRecipesComponent {
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
  dataSource: IFavRecipeItem[] = [];
  noData = false;
  searchForm!: FormGroup;
  pagesNumber!: number;
  paramsData = {
    pageSize: 10,
    pageNumber: 0,
    name: '',
    tagId: undefined,
    categoryId: undefined,
  };
  intialPage = {
    pageNumber: 0,
    pageSize: 10,
  };
  view: 'table' | 'card' = 'table';
  route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>(); // 🚀 Unsubscribe handler
  favRecipesActive = false; // Store query param value

  fb = inject(FormBuilder);
  constructor(
    private recipeService: RecipeService,
    public dialog: MatDialog,
    private _sharedService: SharedService,
    private _userService: UserRecipesService,
    private _favService: FavRecipesService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.favRecipesActive = this.router.url.includes('/fav-recipes');
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
        this.paramsData.tagId = tag;
        this.getRecipes(); // ✅ Call API with updated values
      });

    this.getRecipes();
  }
  getImageUrl(imagePath: string): string {
    const baseUrl = 'https://upskilling-egypt.com:3006/'; // ✅ تأكد أن هذا هو الـ base URL الصحيح
    return `${baseUrl}${imagePath}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); // ✅ Clean up subscriptions
  }
  toggleView(viewType: 'table' | 'card'): void {
    if (this.view !== viewType) {
      this.view = viewType;
    }
  }
  addToFav(recipeId: number) {
    this._userService.addToFavourite(recipeId).subscribe({
      next: () => {
        this.toaster.success('Added to Favourite');
      },
    });
  }
  openViewRecipeDialog(recipe: FoodItem): void {
    const dialogRef=this.dialog.open(ViewRecipeDialogComponent, {
      width: '600px',
      data: { ...recipe, fav: this.favRecipesActive }, // ✅ Directly use stored value
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted') {
        this.getRecipes(); // ✅ Refresh table data
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '600px',
      data: {
        tagList: this.tagList,
        categoryList: this.categoryList,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        // ✅ Update paramsData before calling getRecipes
        this.paramsData.name = this.searchForm.get('name')!.value || '';
        this.paramsData.tagId = this.searchForm.get('tag')!.value || undefined;
        this.paramsData.categoryId =
          this.searchForm.get('category')!.value || undefined;

        this.getRecipes();
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.intialPage.pageNumber = event.pageIndex;
    this.intialPage.pageSize = event.pageSize;
    this.paramsData.name = this.searchForm.get('name')!.value || '';
    this.paramsData.tagId = this.searchForm.get('tag')!.value || undefined;
    this.paramsData.categoryId =
      this.searchForm.get('category')!.value || undefined;

    this.getRecipes();
  }

  getRecipes(): void {
    this._favService
      .getFavoriteRecipes(this.paramsData) // ✅ Pass paramsData object
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: IFavRecipes) => {
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
