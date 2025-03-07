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


@NgModule({
  declarations: [AddDialogComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIcon,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
  ],
  exports: [
    MatIcon,
    AddDialogComponent,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedModule {}
