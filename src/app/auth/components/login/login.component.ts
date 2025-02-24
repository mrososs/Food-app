import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}
  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.toaster.success('Login Success', 'Welcome');
        localStorage.setItem('token', res.token);
        const role = this.authService.getUserGroup();
        if (role) {
          localStorage.setItem('role', role);
        }
      },
      error: (error) => {
        this.toaster.error(error.message, 'error in login', {
          timeOut: 3000,
        });
      },
      complete: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
