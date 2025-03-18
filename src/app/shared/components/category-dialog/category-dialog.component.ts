import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from '../../../dashboard/admin/categories/services/categories.service';
import { RecipeService } from '../../../dashboard/admin/recipes/services/recipe.service';
import { SharedService } from '../../services/shared.service';
import { ITagList } from '../../../core/interfaces/tags';
import { ICategoryList } from '../../../core/interfaces/category';

interface DialogData {
  mode: 'add' | 'view' | 'edit' | 'delete';
  id: number;
  name?: string;
  price?: string;
  description?: string;
  catMode?: boolean;
}

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  categoryForm!: FormGroup;
  title = 'View Category';
  isDeleteMode = false;
  isView = false;
  isEdit = false;
  tagList!: ITagList[];
  catList!: ICategoryList[];

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private _recipeService: RecipeService,
    private _sharedService: SharedService
  ) {}
  ngOnInit(): void {
    if(this.data.mode === 'delete'){
      this.isDeleteMode = true;
    }
    if(this.data.catMode){
        this.title = 'View Recipe';
        if(this.data.mode === 'delete'){
          this.title = 'Delete Recipe';
        }
    }
    if (this.data.catMode) {
      this._sharedService.getTagList().subscribe({
        next: (tags) => {
          this.tagList = tags; // Assign the tag list
          this.loadRecipeData(); // Call function to set form values
        },
      });
      this._sharedService.getCategoryList(1, 10).subscribe({
        next: (cat) => {
          this.catList = cat.data; // Assuming 'items' contains the array of categories
          this.loadRecipeData();
        },
      });
    } else {
      this.loadCategoryData(); // Load category data if not catMode
    }

    this.categoryForm = this.fb.group({
      name: [this.data.name || ''],
      price: [this.data.price || ''],
      description: [this.data.description || ''],
      tagId: [''],
      categoriesIds: [''],
    });

    if (this.data.mode === 'edit') {
      this.isEdit = true;
    }
    if (this.data.mode === 'view') {
      this.isView = true;
      this.categoryForm.disable();
    }
  }

  // Load category data
  loadCategoryData(): void {
    this.categoriesService.getCategoryById(this.data.id).subscribe({
      next: (res) => {
        this.categoryForm.patchValue({ name: res.name });
      },
    });
  }

  // Load recipe data
  loadRecipeData(): void {
    this._recipeService.getRecipeById(this.data.id).subscribe({
      next: (res) => {
        this.categoryForm.patchValue({
          name: res.name,
          price: res.price,
          description: res.description,
          tagId: res.tag?.id ?? '',
          categoriesIds: res.category?.map((res) => res.id) ?? '',
        });
      },
    });
  }

  deleteItem(): void {
    if (this.data.catMode) {
      this._recipeService.deleteRecipe(this.data.id).subscribe({
        next: () => {
          this.dialogRef.close('delete');
        },
      });
    } else {
      this.categoriesService.deleteCategory(this.data.id).subscribe({
        next: () => {
          this.dialogRef.close('delete');
        },
      });
    }
  }
  save(): void {
    if (this.isEdit && this.data.catMode) {
      this._recipeService.getRecipeById(this.data.id).subscribe({
        next: (res) => {
          const updatedRecipe = {
            ...res, // Keep all existing fields
            ...this.categoryForm.value, // Override with new form values
            categoriesIds: this.categoryForm.value.categoriesIds
              ? this.categoryForm.value.categoriesIds.join(',')
              : '', // Convert array to comma-separated string
          };

          this._recipeService
            .updateRecipe(this.data.id, updatedRecipe)
            .subscribe({
              next: () => {
                this.dialogRef.close('edit');
              },
            });
        },
      });
    } else if (this.isEdit) {
      this.categoriesService
        .updateCategory(this.data.id, this.categoryForm.value)
        .subscribe({
          next: () => {
            this.dialogRef.close('edit');
          },
        });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
