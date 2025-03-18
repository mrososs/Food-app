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
  title = '';
  isDeleteMode = false;
  isView = false;
  isEdit = false;
  tagList: ITagList[] = [];
  catList: ICategoryList[] = [];
  
  formFields: { key: string; label: string; type: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private recipeService: RecipeService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.isDeleteMode = this.data.mode === 'delete';
    this.isEdit = this.data.mode === 'edit';
    this.isView = this.data.mode === 'view';

    this.title = this.data.catMode ? 'View Recipe' : 'View Category';
    if (this.isDeleteMode) {
      this.title = this.data.catMode ? 'Delete Recipe' : 'Delete Category';
    }

    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      name: [this.data.name || ''],
      price: [this.data.price || ''],
      description: [this.data.description || ''],
      tagId: [''],
      categoriesIds: [''],
    });

    if (this.isView) this.categoryForm.disable();

    // Define dynamic form fields
    this.formFields = [
      { key: 'name', label: this.data.catMode ? 'Recipe Name' : 'Category Name', type: 'text' },
      ...(this.data.catMode ? [
        { key: 'price', label: 'Recipe Price', type: 'text' },
        { key: 'description', label: 'Recipe Description', type: 'text' },
        { key: 'tagId', label: 'Tag', type: 'select' },
        { key: 'categoriesIds', label: 'Category', type: 'multi-select' }
      ] : [])
    ];
  }

  loadData(): void {
    if (this.data.catMode) {
      this.sharedService.getTagList().subscribe(tags => (this.tagList = tags));
      this.sharedService.getCategoryList(1, 10).subscribe(cat => (this.catList = cat.data));
      this.recipeService.getRecipeById(this.data.id).subscribe(res => {
        this.categoryForm.patchValue({
          name: res.name,
          price: res.price,
          description: res.description,
          tagId: res.tag?.id ?? '',
          categoriesIds: res.category?.map(c => c.id) ?? '',
        });
      });
    } else {
      this.categoriesService.getCategoryById(this.data.id).subscribe(res => {
        this.categoryForm.patchValue({ name: res.name });
      });
    }
  }

  save(): void {
    const formData = { ...this.categoryForm.value };
    formData.categoriesIds = Array.isArray(formData.categoriesIds)
      ? formData.categoriesIds.join(',')
      : '';

    if (this.isEdit && this.data.catMode) {
      this.recipeService.updateRecipe(this.data.id, formData).subscribe(() => this.dialogRef.close('edit'));
    } else if (this.isEdit) {
      this.categoriesService.updateCategory(this.data.id, formData).subscribe(() => this.dialogRef.close('edit'));
    }
  }

  deleteItem(): void {
    const deleteRequest = this.data.catMode
      ? this.recipeService.deleteRecipe(this.data.id)
      : this.categoriesService.deleteCategory(this.data.id);
    
    deleteRequest.subscribe(() => this.dialogRef.close('delete'));
  }

  close(): void {
    this.dialogRef.close();
  }
}
