import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ConfirmPassword } from 'src/app/validators/confirm-password.validator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  hide: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  initRegistrationForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: ConfirmPassword('password', 'confirmPassword')
    });
  }

  get formData(): { [key: string]: AbstractControl<any, any> } {
    return this.registerForm.controls;
  }

  userRegistration(): void | boolean {
    if (this.registerForm.invalid) {
      return false;
    }
  }
}
