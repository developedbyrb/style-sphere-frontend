import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// imported material modules
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// imported common services and components
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { GET_CATEGORIES } from '../categories.graphql.operations';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  constructor(
    private router: Router,
    private graphqlService: GraphqlService,
    private snackBar: MatSnackBar
  ) { }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'code', 'price_start', 'price_end', 'status', 'action'];
  perPage: number = 5;
  totalData: number = 0;
  searchValue: string = "";

  ngOnInit(): void {
    this.loadCategories(1);
  }

  loadCategories(currentPage: number) {
    const paginationObject = {
      page: currentPage,
      limit: this.perPage,
    };

    this.graphqlService.getData(GET_CATEGORIES, paginationObject)
      .subscribe({
        next: (CategoriesData: any) => {
          this.dataSource = CategoriesData?.categories?.data ?? [];
          this.totalData = CategoriesData?.categories?.paginatorInfo?.total ?? 0;
        },
        error: (err) => {
          if (err.message.includes('Forbidden')) {
            this.snackBar.open('You are not authorized to view this page', 'Close', {
              duration: 3 * 1000,
            });
            this.router.navigate(['/']);
          }
        }
      });
  }

  redirectTo(route: string) {
    this.router.navigate([`${this.router.url}/${route}`]);
  }
}
