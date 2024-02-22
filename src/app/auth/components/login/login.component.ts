import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { USER_LOGIN } from './login.graphql.operations';
import { TokenService } from '../../services/token.service';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private graphqlService: GraphqlService
  ) {
  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  get formData(): { [key: string]: AbstractControl<any, any> } {
    return this.loginForm.controls;
  }

  userLogin(): void | boolean {
    if (this.loginForm.invalid) {
      return false;
    }

    const data = {
      'email': this.formData['email'].value,
      'password': this.formData['password'].value
    };

    this.graphqlService.mutateData(USER_LOGIN, data).subscribe({
      next: value => {
        this.responseHandler(value.data);
      },
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => {
        this.authService.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      }
    });
  }

  responseHandler(responseData: any) {
    this.tokenService.storeToken(responseData.login.token);
    this.tokenService.storeName(responseData.login?.user?.name);
  }
}
