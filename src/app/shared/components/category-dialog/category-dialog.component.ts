import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from '../../../dashboard/admin/categories/services/categories.service';

interface DialogData {
  mode: 'add'|'view' | 'edit' | 'delete';
  id?: number;
  categoryName?: string;
}

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  categoryForm!: FormGroup;
  title = 'Add Category';
  isDeleteMode = false;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private categoriesService:CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [this.data.categoryName || ''],
    });
    this.categoriesService.getCategoryById(this.data.id).subscribe(
      {
        next:()=>this.categoryForm.patchValue({name:this.data.categoryName})
      }
    );
    console.log('Dialog data:', this.data);
    // Update title based on mode
    if (this.data.mode === 'edit') {
      this.title = 'Edit Category';
    } else if (this.data.mode === 'delete') {
      this.title = 'Delete Category';
      this.isDeleteMode = true;
    }
  }

  save(): void {
    if (this.isDeleteMode) {
      console.log(`Deleting category with ID: ${this.data.id}`);
    } else {
      console.log('Saving category:', this.categoryForm.value);
    }
    this.dialogRef.close(this.categoryForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
