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
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { map } from 'rxjs';

// import common modules
import { FileUploadComponent } from 'src/app/common/components/file-upload/file-upload.component';
import { regex } from 'src/app/common/constants/regex';
import { GET_CITIES, GET_COUNTRIES, GET_STATES } from 'src/app/common/schemas/geoConfigs.graphql.schemas';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { GET_PRODUCTS, GET_PRODUCT_DETAILS } from '../../products/products.graphql.operations';
import { CREATE_SHOP } from '../shops.graphql.schemas';

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
    MatSelectModule
  ],
  templateUrl: './upsert-shop.component.html',
  styleUrls: ['./upsert-shop.component.scss']
})
export class UpsertShopComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private graphqlService: GraphqlService
  ) { }

  shopForm!: FormGroup;
  isEdit: boolean = false;
  uploadedFiles: any[] = [];
  countriesList: any[] = [];
  statesList: any[] = [];
  citiesList: any[] = [];
  productsList: any[] = [];
  productErrorArray: any[] = [];
  selectedProduct: string[] = [];

  ngOnInit(): void {
    this.initializeShopForm();
  }

  initializeShopForm() {
    this.shopForm = this.formBuilder.group({
      generalDetails: this.formBuilder.group({
        'name': ['', [Validators.required]],
        'email': ['', [Validators.required, Validators.pattern(regex.email)]],
        'website': [''],
        'number': ['', [Validators.required]],
        'description': ['']
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

  formSubmit(): boolean | void {
    if (this.shopForm.invalid) {
      return false;
    }

    const data = {
      "generalDetails": this.shopForm.get('generalDetails')?.value,
      "addressDetails": this.shopForm.get('addressDetails')?.value,
      "productDetails": this.shopForm.get('productDetails')?.value
    }

    this.graphqlService.mutateData(CREATE_SHOP, data)
      .subscribe({
        error: err => console.error('Observable emitted an error: ' + err),
        complete: () => {
          this.backToList();
        }
      });
  }

  getFiles($event: File[]) {
    this.uploadedFiles = $event;
  }

  getCountries() {
    this.graphqlService.getData(GET_COUNTRIES)
      .pipe(map((module) => module.countries))
      .subscribe({
        next: (countries: any) => {
          this.countriesList = countries;
        },
        error: (err) => {
        }
      });
  }

  countryValueChange(event: string) {
    this.graphqlService.getData(GET_STATES, { countryId: event })
      .pipe(map((module) => module.stateByCountryId))
      .subscribe({
        next: (states: any) => {
          this.statesList = states;
        },
        error: (err) => {
        }
      });
  }

  stateValueChange(event: string) {
    this.graphqlService.getData(GET_CITIES, { stateId: event })
      .pipe(map((module) => module.citiesByStateId))
      .subscribe({
        next: (cities: any) => {
          this.citiesList = cities;
        },
        error: (err) => {
        }
      });
  }

  onKey(target: any) {
    this.countriesList = this.search(target.value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.countriesList.filter(option => option.name.toLowerCase().startsWith(filter));
  }

  getProducts() {
    this.graphqlService.getData(GET_PRODUCTS)
      .pipe(map(module => module.products))
      .subscribe({
        next: (productData: any) => {
          this.productsList = productData.data;
        },
        error: err => console.error('Observable emitted an error: ' + err)
      });
  }

  getProductDetails(event: string, index: number) {
    const data = { id: event };
    this.selectedProduct[index] = event;
    this.graphqlService.getData(GET_PRODUCT_DETAILS, data)
      .pipe(map((module) => module.product))
      .subscribe({
        next: (data: any) => {
          const getFormGroup = this.products.controls.at(index) as FormGroup;
          if (getFormGroup) {
            getFormGroup.get('stock')?.setValidators([
              Validators.required,
              Validators.max(data.current_stock_qty),
              Validators.min(data.low_stock_alert_qty)
            ]);
            getFormGroup.get('stock')?.updateValueAndValidity();

            getFormGroup.get('price')?.setValidators([
              Validators.required,
              Validators.max(data.selling_price),
              Validators.min(data.purchase_price)
            ]);
            getFormGroup.get('price')?.updateValueAndValidity();
          }
        },
        error: (err) => {
        }
      });
  }
}
