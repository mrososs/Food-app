import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  email: string = ''; // Separate email variable

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  ngOnInit() {}
  sendEmail(forgetPassword: NgForm) {
    if (forgetPassword.invalid) {
      console.log('Invalid Form');
      return;
    }
    this.AuthService.forgetPassword(forgetPassword.value).subscribe({
      next: (response) => {
        console.log('Email Sent Successfully:', response);
        this.toasterService.success('Email Sent Successfully');
      },
      error: (error) => {
        console.log('Error:', error);
        this.toasterService.error('Error');
      },
      complete: () => {
        this.router.navigate(['/auth/verifyAccount']);
      },
    });
  }
}
