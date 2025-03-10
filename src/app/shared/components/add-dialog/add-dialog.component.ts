import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../services/shared.service';
import { ITagList } from '../../../core/interfaces/tags';
import {
  ICategoryList,
  PaginatedCategoryResponse,
} from '../../../core/interfaces/category';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  addRecipeForm!: FormGroup;
  tagList: ITagList[] = []; // ✅ Define tagList property
  categoryList: ICategoryList[] = []; // ✅ Define categoryList property
  fb = inject(FormBuilder);
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { tagList: ITagList[]; categoryList: ICategoryList[] },
    private _sharedService: SharedService
  ) {
    this.addRecipeForm = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
      categoriesIds: [[]], // This should be an array
      tag: [''],
      image: [null], // Store file object
    });
    this.tagList = data.tagList || [];
    this.categoryList = data.categoryList || [];
  }

  ngOnInit() {
    // this.getTagList();
    // this.getCategoryList();
  }
  submitRecipe() {
    if (this.addRecipeForm.valid) {
      this._sharedService.addRecipe(this.addRecipeForm.value).subscribe({
        next: (res) => {
          console.log('Recipe added successfully', res);
          this.dialogRef.close(true); // ✅ Close dialog with "true" on success
        },
        error: (err) => {
          console.error('Error adding recipe', err);
        },
      });
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  // getCategoryList() {
  //   this._sharedService.getCategoryList(1, 10).subscribe({
  //     next: (res: PaginatedCategoryResponse) => {
  //       console.log('Category List API Response:', res);
  //       this.categoryList = res.data || [];
  //     },
  //     error: (err) => {
  //       // this._toasterService.error('Error fetching category list');
  //     },
  //   });
  // }
  // getTagList() {
  //   this._sharedService.getTagList().subscribe({
  //     next: (res: ITagList[]) => {
  //       this.tagList = res;
  //     },
  //     error: (err) => {
  //       // this._toasterService.error('error in tag List');
  //     },
  //   });
  // }
}
