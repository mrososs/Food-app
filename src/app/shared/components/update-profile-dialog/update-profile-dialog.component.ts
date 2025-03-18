import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-update-profile-dialog',
  templateUrl: './update-profile-dialog.component.html',
  styleUrl: './update-profile-dialog.component.scss',
})
export class UpdateProfileDialogComponent implements OnInit {
  password!: string;
  constructor(
    public dialogRef: MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { formValues: any },
    private _sharedService:SharedService
  ) {}
  ngOnInit(): void {
      console.log(this.data.formValues);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  updateProfile(): void {
    const data = {
      ...this.data.formValues,
      confirmPassword: this.password,
    }
    this._sharedService.updateProfile(data).subscribe((data) => {
      this.dialogRef.close(data);
      
    });
  }
}
