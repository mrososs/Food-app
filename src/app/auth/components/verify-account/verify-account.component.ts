import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit {
  email!: string;
  code!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  ngOnInit() {}
  checkEmail(verifyAccount: NgForm) {
    if (verifyAccount.invalid) {
      console.log('Invalid Form');
      return;
    }
    this.authService.verifyAccount(verifyAccount.value).subscribe({
      next: () => {
        this.toasterService.success('Email Verified Successfully');
      },
      error: () => {
        this.toasterService.error('Error');
      },
      complete: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
