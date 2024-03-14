import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { GET_COUNTRIES } from 'src/app/common/schemas/geoConfigs.graphql.schemas';
import { map } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule
  ],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private graphqlService: GraphqlService
  ) { }

  contactForm!: FormGroup;
  countriesList: any[] = [];
  statesList: any[] = [];
  citiesList: any[] = [];
  deliveryMethods: any[] = [
    {
      name: 'Standard',
      value: 'standard'
    },
    {
      name: 'Express',
      value: 'express'
    },
  ];
  paymentMethods: any[] = [
    {
      name: 'Credit Card',
      value: 'credit-card'
    },
    {
      name: 'UPI',
      value: 'upi'
    },
    {
      name: 'Cash On Delivery',
      value: 'cod'
    }
  ];

  ngOnInit(): void {
    this.getCountries();
    this.initializeContactForm();
  }

  initializeContactForm() {
    this.contactForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'fullName': ['', [Validators.required]],
      'address': ['', [Validators.required]],
      'country': ['', [Validators.required]],
      'state': ['', [Validators.required]],
      'city': ['', [Validators.required]],
      'pincode': ['', [Validators.required]],
      'mobile': ['', [Validators.required]],
      'paymentType': ['cod', [Validators.required]]
    });
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
}
