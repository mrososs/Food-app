import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../core/interfaces/users';

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
  constructor() {
    this._userService.user$.subscribe((user) => {
      this.userCurrent = user;
    });
    this.profileForm = this.fb.group({
      userName: [{ value: '' }],
      email: [{ value: '' }],
      phoneNumber: [{ value: '' }],
      country: [{ value: '' }],
      imagePath: [{ value: '' }],
    });
  }
  ngOnInit(): void {
    this.profileForm.disable();
    this._userService.user$.subscribe((user) => {
      this.userCurrent = user;
      this.imgPath = this.getImageUrl(user?.imagePath);
      if (user) {
        this.profileForm.patchValue(user); // Populate form if user data is available
      }
    });
  }
  saveProfile(): void {
    console.log('Saving profile...', this.profileForm.value); // Debugging
    this.isEditMode = false; // Disable edit mode
    this.profileForm.disable(); // Lock fields again
  }
  onEdit(): void {
    this.profileForm.enable();
    this.isEditMode = true;
  }
  getImageUrl(imagePath: string | undefined): string {
    const baseUrl = 'https://upskilling-egypt.com:3006/';
    return `${baseUrl}${imagePath}`;
  }
}
