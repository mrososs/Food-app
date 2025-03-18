import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from '../../../dashboard/admin/categories/services/categories.service';
import { RecipeService } from '../../../dashboard/admin/recipes/services/recipe.service';

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

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private _recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.categoryForm = this.fb.group({
      name: [this.data.name || ''],
      price: [this.data.price || ''],
      description: [this.data.description || ''],
    });
    if (this.data.mode === 'edit') {
      this.isEdit = true;
    }
    if (this.data.mode === 'view') {
      this.isView = true;
      this.categoryForm.disable();
    }
    if (!this.data.catMode) {
      this.categoriesService.getCategoryById(this.data.id).subscribe({
        next: (res) => {
          this.categoryForm.patchValue({ name: res.name });
        },
      });
    } else {
      this.title = 'View Recipe';
      if (this.data.mode === 'edit') {
        this.title = 'Edit Recipe';
      } else if (this.data.mode === 'delete') {
        this.title = 'Delete Recipe';
        this.isDeleteMode = true;
      }
      this._recipeService.getRecipeById(this.data.id).subscribe({
        next: (res) => {
          console.log(res);
          this.categoryForm.patchValue({
            name: res.name,
            price: res.price,
            description: res.description,
          });
        },
      });
    }

    // Update title based on mode
    if (this.data.mode === 'edit') {
      this.title = 'Edit Category';
    } else if (this.data.mode === 'delete') {
      this.title = 'Delete Category';
      this.isDeleteMode = true;
    }
  }
  deleteItem(): void {
    this.categoriesService.deleteCategory(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close('delete');
      },
    });
  }
  save(): void {
    if (this.isEdit) {
      this.categoriesService
        .updateCategory(this.data.id, this.categoryForm.value)
        .subscribe({
          next: () => {
            this.dialogRef.close('edit');
          },
        });
    }
    this.dialogRef.close(this.categoryForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
