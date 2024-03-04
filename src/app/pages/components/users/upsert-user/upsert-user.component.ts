import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { GET_ROLES_FOR_FILTER } from '../../roles/roles.graphql.operations';
import { CREATE_USERS, GET_USER_DETAILS } from '../users.graphql.operations';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadComponent } from 'src/app/common/components/file-upload/file-upload.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upsert-user',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FileUploadComponent
  ],
  templateUrl: './upsert-user.component.html',
  styleUrls: ['./upsert-user.component.scss']
})
export class UpsertUserComponent implements OnInit {
  userForm!: FormGroup;
  genderList: any[] = [
    {
      'code': 'male',
      'name': 'Male'
    },
    {
      'code': 'female',
      'name': 'Female'
    },
    {
      'code': 'not-specified',
      'name': 'Not Specified'
    }
  ];
  rolesList: any[] = [];
  isEdit: boolean = false;
  userId: number = 0;
  uploadedFiles!: File[];
  imageUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private graphqlService: GraphqlService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.activatedRoute.snapshot?.paramMap?.get('id')) ?? 0;
    this.getRoles();
    this.initializeUserForm();
    if (this.userId) {
      this.isEdit = true;
      this.getUserDetails(this.userId);
    }
  }

  getRoles() {
    this.graphqlService.getData(GET_ROLES_FOR_FILTER)
      .subscribe({
        next: (rolesData: any) => {
          this.rolesList = rolesData.roles.data;
        },
        error: err => console.error('Observable emitted an error: ' + err)
      });
  }

  initializeUserForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      role: ['', [Validators.required]]
    });
  }

  get formData(): { [key: string]: AbstractControl<any, any> } {
    return this.userForm.controls;
  }

  createUser(): void | boolean {
    if (this.userForm.invalid) {
      return false;
    }

    let data = {
      'email': this.formData['email'].value,
      'name': this.formData['name'].value,
      'roleId': this.formData['role'].value,
      'password': 'password'
    }

    let fileUpload = false;
    if (this.uploadedFiles.length > 0) {
      fileUpload = true;
      data = { ...data, ...{ profile_pic: this.uploadedFiles[0] } }
    }

    this.graphqlService.mutateData(CREATE_USERS, data, fileUpload).subscribe({
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => {
        this.backToList();
      }
    });
  }

  backToList() {
    this.router.navigate(['/users']);
  }

  getUserDetails(id: number) {
    const data = { id: id };
    this.graphqlService.getData(GET_USER_DETAILS, data).subscribe({
      next: value => {
        const userData = value.user;
        this.imageUrl = environment.baseUrl + userData.user_profile;
        this.userForm.setValue({
          'name': userData.name,
          'email': userData.email,
          'role': userData.role.id
        });
      },
      error: err => console.error('Observable emitted an error: ' + err)
    })
  }

  getFiles($event: File[]) {
    this.uploadedFiles = $event;
  }


}
