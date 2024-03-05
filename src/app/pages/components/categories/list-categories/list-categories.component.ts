import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// imported material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

// imported common services and components
import { DialogComponent } from 'src/app/common/components/dialog/dialog.component';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { GET_CATEGORIES, REMOVE_CATEGORY } from '../categories.graphql.operations';

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
    MatIconModule,
    MatDialogModule,
    DialogComponent
  ],
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  constructor(
    private router: Router,
    private graphqlService: GraphqlService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
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

  openDialog(categoryDetails: any) {
    const customMessage = `You want to delete category ${categoryDetails.name}.`;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: 'Are you sure?', message: customMessage, modalData: categoryDetails.id },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.removeCategory(categoryDetails.id, dialogRef);
      }
    });
  }

  removeCategory(id: number | string, dialogRef: any) {
    const data = { 'id': id };
    this.graphqlService.mutateData(REMOVE_CATEGORY, data).subscribe({
      next: () => {
        this.loadCategories(1);
      },
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => {
        dialogRef.close();
      }
    });
  }
}
