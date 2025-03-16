import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import { UploaderModule } from 'angular-uploader';

@NgModule({
  declarations: [
    AddDialogComponent,
    SpinnerComponent,
    LogoutDialogComponent,
    ChangePasswordComponent,
    CategoryDialogComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIcon,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
        UploaderModule,
    
    MatTableModule,
  ],
  exports: [
    MatIcon,
    MatTooltipModule,
    AddDialogComponent,
    SpinnerComponent,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedModule {}
