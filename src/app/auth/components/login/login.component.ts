import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private toaster: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}
  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.toaster.success('Hello world!', 'Toastr fun!');
      },
      error: (error) => {
        this.toaster.error(error.message, 'error in login', {
          timeOut: 3000,
        });
      },
      complete: () => {},
    });
  }
}
