import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadComponent } from 'src/app/common/components/file-upload/file-upload.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upsert-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadComponent,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './upsert-products.component.html',
  styleUrls: ['./upsert-products.component.scss']
})
export class UpsertProductsComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  isEdit: boolean = false;
  productForm!: FormGroup;
  imageUrl: any = [];
  uploadedFiles!: File[];

  ngOnInit(): void {
    this.initializeProductForm();
  }

  initializeProductForm() {
    this.productForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'code': ['', [Validators.required]],
      'purchase_price': [''],
      'selling_price': [''],
      'status': ['inactive', [Validators.required]],
    });
  }

  createProduct() {
    console.log('create product');
  }

  get formData() {
    return this.productForm.controls;
  }

  getFiles($event: File[]) {
    this.uploadedFiles = $event;
  }

  backToList() {
    this.router.navigate(['/products']);
  }
}
