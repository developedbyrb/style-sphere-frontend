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
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { CREATE_PRODUCTS, GET_CATEGORIES, GET_PRODUCT_DETAILS, UPDATE_PRODUCT } from '../products.graphql.operations';
import { map } from 'rxjs';

interface Category {
  id: number;
  name: string;
}

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
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './upsert-products.component.html',
  styleUrls: ['./upsert-products.component.scss']
})
export class UpsertProductsComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private graphqlService: GraphqlService,
    private activatedRoute: ActivatedRoute
  ) { }

  isEdit: boolean = false;
  productForm!: FormGroup;
  imageUrl: any = [];
  uploadedFiles!: File[];
  categories: Category[] = [];
  productData: any = {};
  productId: number = 0;

  ngOnInit(): void {
    this.getCategories();
    const productId = Number(this.activatedRoute.snapshot?.params['id']);
    if (productId) {
      this.productId = productId;
      this.getProductEditDetails(productId);
    } else {
      this.initializeProductForm();
    }
  }

  getProductEditDetails(id: number) {
    this.isEdit = true;
    const productData = { id: id };

    this.graphqlService.getData(GET_PRODUCT_DETAILS, productData).subscribe({
      next: (response) => {
        this.productData = response.product;
      },
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => {
        this.initializeProductForm();
      }
    })
  }

  getCategories() {
    this.graphqlService.getData(GET_CATEGORIES)
      .pipe(map(response => response.categories))
      .subscribe({
        next: (categoriesList: any) => {
          this.categories = categoriesList.data;
        },
        error: (err) => {
        }
      });
  }

  initializeProductForm() {
    console.log('test');
    this.productForm = this.formBuilder.group({
      'name': [this.productData?.name, [Validators.required]],
      'code': [this.productData?.code, [Validators.required]],
      'purchase_price': [this.productData?.purchase_price],
      'selling_price': [this.productData?.selling_price],
      'status': [this.productData?.status, [Validators.required]],
      'category_id': [this.productData?.category_id, [Validators.required]],
      'tags': [this.productData?.tags, [Validators.required]],
      'current_stock_qty': [this.productData?.current_stock_qty, [Validators.required]],
      'low_stock_alert_qty': [this.productData?.low_stock_alert_qty, [Validators.required]],
      'description': [this.productData?.description, [Validators.required]]
    });
  }

  createProduct(): boolean | void {
    if (this.productForm.invalid) {
      return false;
    }

    let formData = this.productForm.value;

    let fileUpload = false;
    if (this.uploadedFiles && this.uploadedFiles.length > 0) {
      fileUpload = true;
      formData = { ...formData, ...{ image: this.uploadedFiles[0] } }
    }

    if (this.isEdit) {
      const editData = { id: this.productId };
      formData = { ...formData, ...editData };
      this.graphqlService.mutateData(UPDATE_PRODUCT, formData, fileUpload).subscribe({
        error: err => console.error('Observable emitted an error: ' + err),
        complete: () => {
          this.backToList();
        }
      });
    } else {
      this.graphqlService.mutateData(CREATE_PRODUCTS, formData, fileUpload).subscribe({
        error: err => console.error('Observable emitted an error: ' + err),
        complete: () => {
          this.backToList();
        }
      });
    }
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
