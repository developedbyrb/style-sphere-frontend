import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// import material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';

// import common components
import { FileUploadComponent } from 'src/app/common/components/file-upload/file-upload.component';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { CREATE_CATEGORY } from '../categories.graphql.operations';

@Component({
  selector: 'app-upsert-categories',
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
  templateUrl: './upsert-categories.component.html',
  styleUrls: ['./upsert-categories.component.scss']
})
export class UpsertCategoriesComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private graphqlService: GraphqlService
  ) {
  }

  isEdit: boolean = false;
  categoryForm!: FormGroup;
  imageUrl: any = [];
  uploadedFiles!: File[];

  ngOnInit(): void {
    this.initializeCategoryForm();
  }

  initializeCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'code': ['', [Validators.required]],
      'price_start_from': [''],
      'price_end_to': [''],
      'status': ['inactive', [Validators.required]],
    });
  }

  createUser(): void | boolean {
    if (this.categoryForm.invalid) {
      return false;
    }

    let data = {
      'name': this.formData['name'].value,
      'code': this.formData['code'].value,
      'price_start_from': this.formData['price_start_from'].value,
      'price_end_to': this.formData['price_end_to'].value,
      'status': this.formData['status'].value
    }

    let fileUpload = false;
    if (this.uploadedFiles.length > 0) {
      fileUpload = true;
      data = { ...data, ...{ image: this.uploadedFiles[0] } }
    }

    this.graphqlService.mutateData(CREATE_CATEGORY, data, fileUpload).subscribe({
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => {
        this.backToList();
      }
    });
  }

  get formData() {
    return this.categoryForm.controls;
  }

  getFiles($event: File[]) {
    this.uploadedFiles = $event;
  }

  backToList() {
    this.router.navigate(['/categories']);
  }
}
