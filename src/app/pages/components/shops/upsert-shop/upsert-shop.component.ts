import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// import material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';

// import common modules
import { FileUploadComponent } from 'src/app/common/components/file-upload/file-upload.component';
import { regex } from 'src/app/common/constants/regex';

@Component({
  selector: 'app-upsert-shop',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatStepperModule,
    FileUploadComponent,
  ],
  templateUrl: './upsert-shop.component.html',
  styleUrls: ['./upsert-shop.component.scss']
})
export class UpsertShopComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  shopForm!: FormGroup;
  isEdit: boolean = false;
  uploadedFiles: any[] = [];

  ngOnInit(): void {
    this.initializeShopForm();
  }

  initializeShopForm() {
    this.shopForm = this.formBuilder.group({
      generalDetails: this.formBuilder.group({
        'name': ['', [Validators.required]],
        'email': ['', [Validators.required, Validators.pattern(regex.email)]],
        'website': [''],
        'number': ['']
      }),
      addressDetails: this.formBuilder.array([]),
      productDetails: this.formBuilder.array([]),
    });

    this.addAddressDetails();
    this.addProductDetails();
  }

  get formData() {
    return this.shopForm.controls;
  }

  get generalData() {
    return (this.shopForm.get('generalDetails') as FormGroup).controls;
  }

  get addresses() {
    return this.shopForm.get('addressDetails') as FormArray;
  }

  get products() {
    return this.shopForm.get('productDetails') as FormArray;
  }

  addAddressDetails() {
    const addressGroup = this.formBuilder.group({
      'address_1': ['', [Validators.required]],
      'address_2': ['', [Validators.required]],
      'pincode': ['', [Validators.required]],
      'city': ['', [Validators.required]],
      'state': ['', [Validators.required]],
      'country': ['', [Validators.required]]
    });

    this.addresses.push(addressGroup);
  }

  deleteAddress(index: number) {
    this.addresses.removeAt(index);
  }

  addProductDetails() {
    const productGroup = this.formBuilder.group({
      'product': ['', [Validators.required]],
      'stock': ['', [Validators.required]],
      'price': ['', [Validators.required]]
    });

    this.products.push(productGroup);
  }

  backToList() {
    this.router.navigate(['/shops']);
  }

  formSubmit() {
    console.log(this.shopForm);
    console.log('form submit!');
  }

  getFiles($event: File[]) {
    this.uploadedFiles = $event;
  }
}
