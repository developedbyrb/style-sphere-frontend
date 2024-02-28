import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { GET_ROLES } from './roles.graphql.operations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';

interface Roles {
  id: number | string;
  name: string;
  created_at: string;
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'userCount', 'created_at'];
  dataSource = new MatTableDataSource<Roles>();

  constructor(private graphqlService: GraphqlService) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.graphqlService.getData(GET_ROLES).subscribe({
      next: (rolesData: any) => { this.dataSource = rolesData.roles.data; },
      error: err => console.error('Observable emitted an error: ' + err)
    });
  }
}
