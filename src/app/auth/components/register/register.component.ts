import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { passwordMatchValidator } from './cutsom-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private AuthService: AuthService, private toastr: ToastrService) {
    // Apply password match validator to the entire form group
    this.registerForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', Validators.required),
      phonenumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required,passwordMatchValidator]),
    }); // Apply custom validator here

    }
  
  
  
  onRegister() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      const formValue = this.registerForm.value;

      formData.append('userName', formValue.userName);
      formData.append('email', formValue.email);
      formData.append('country', formValue.country);
      formData.append('phoneNumber', formValue.phonenumber);
      formData.append('password', formValue.password);
      formData.append('confirmPassword', formValue.confirmPassword);

      if (formValue.profileImage) {
        formData.append('profileImage', formValue.profileImage);
      }

      this.AuthService.register(formData).subscribe({
        next: () => {
          this.toastr.success('Hello world!', 'Toastr fun!');
          console.log('User registered successfully');
        },
        error: (error) => {
          this.toastr.error(error.message, 'error in register', {
            timeOut: 3000,
          });
          console.error('Error registering user', error);
        },
      });
    }
  }

  // Optionally handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.registerForm.patchValue({ profileImage: file });
  }

  get passwordsMatch() {
    return (
      this.registerForm.hasError('passwordMismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }
}
