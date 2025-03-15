import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss',
})
export class LogoutDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {},
    private router: Router
  ) {}
  ngOnInit(): void {}
  closeDialog(): void {
    this.dialogRef.close();
  }
  logout(): void {
    localStorage.clear(); // Clear all stored user data
    this.dialogRef.close();
    this.router.navigateByUrl('/auth');
  }
}
