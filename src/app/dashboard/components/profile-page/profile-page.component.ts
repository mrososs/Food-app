import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../core/interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileDialogComponent } from '../../../shared/components/update-profile-dialog/update-profile-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  profileForm!: FormGroup;
  fb = inject(FormBuilder);
  isEditMode = false;
  userCurrent: User | null = null;
  imgPath!: string | undefined;
  _userService = inject(UsersService);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this._userService.user$.subscribe((user) => {
      if (user) {
        this.userCurrent = user;
        this.imgPath = this.getImageUrl(user.imagePath);
        this.initializeForm(user);
      }
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateProfileDialogComponent, {
      width: '400px',
      data: { formValues: this.profileForm.value }, // Pass form data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.initializeForm(result);
        this.isEditMode = false;
      }
    });
  }
  initializeForm(user: User): void {
    this.profileForm = this.fb.group({
      userName: [user.userName],
      email: [user.email],
      phoneNumber: [user.phoneNumber],
      country: [user.country],
      imagePath: [user.imagePath],
    });
    this.profileForm.disable(); // Initially disabled
  }

  onEdit(): void {
    this.isEditMode = true;
    this.profileForm.enable();
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      console.log('Saving profile...', this.profileForm.value);
      this.isEditMode = false;
      this.initializeForm(this.profileForm.value); // Reinitialize form with fresh values
    }
  }

  getImageUrl(imagePath: string | undefined): string {
    const baseUrl = 'https://upskilling-egypt.com:3006/';
    return `${baseUrl}${imagePath}`;
  }
}
