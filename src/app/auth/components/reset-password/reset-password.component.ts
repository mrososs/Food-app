import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm! :FormGroup;
  fb=inject(FormBuilder);
  constructor() {
    this.resetPasswordForm=this.fb.group({
      email:['',Validators.required],
      otp:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    });
   }

  ngOnInit() {
  }
  onResetPassword(){}
}
