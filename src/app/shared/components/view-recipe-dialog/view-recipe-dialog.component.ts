import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodItem } from '../../../core/interfaces/recipe';
import { UserRecipesService } from '../../../dashboard/user/user-recipes/services/user-recipes.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FavRecipesService } from '../../../dashboard/user/fav-recipes/services/fav-recipes.service';

@Component({
  selector: 'app-view-recipe-dialog',
  templateUrl: './view-recipe-dialog.component.html',
  styleUrl: './view-recipe-dialog.component.scss',
})
export class ViewRecipeDialogComponent implements OnInit {
  recipePhoto = '';
  addFav = false;
  activeRouter = inject(ActivatedRoute);
  constructor(
    public dialogRef: MatDialogRef<ViewRecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FoodItem & { fav?: boolean },
    private _userService: UserRecipesService,
    private toaster: ToastrService,
    private _favService: FavRecipesService
  ) {}
  ngOnInit(): void {
    if (this.data?.imagePath) {
      this.recipePhoto = this.getImageUrl(this.data.imagePath);
    }
    console.log(this.data.fav);
    if (this.data.fav) {
      this.addFav = true;
    }
  }
  deleteRecipe(recipeId: number) {
    this._favService.deleteFavoriteRecipe(recipeId).subscribe({
      next: () => {
        this.toaster.success('Recipe is Deleted', '', {
          positionClass: 'toast-container', // Custom class for positioning
        });
        this.addFav = false;
        this.dialogRef.close('deleted');
      },
    });
  }
  addToFav(recipeId: number) {
    this._userService.addToFavourite(recipeId).subscribe({
      next: () => {
        this.toaster.success('Added to Favourite', '', {
          positionClass: 'toast-container', // Custom class for positioning
        });
        this.addFav = true;
      },
      error: () => {
        this.toaster.error('Failed to add to Favourite', '', {
          positionClass: 'toast-container',
        });
      },
    });
  }

  getImageUrl(imagePath?: string): string {
    const baseUrl = 'https://upskilling-egypt.com:3006/';
    console.log(`${baseUrl}${imagePath}`);
    return `${baseUrl}${imagePath}`;
  }
}
