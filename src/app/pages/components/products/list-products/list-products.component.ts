import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { GET_PRODUCTS, REMOVE_PRODUCT } from '../products.graphql.operations';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/common/components/dialog/dialog.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    DialogComponent,
    MatChipsModule
  ],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  constructor(
    private graphqlService: GraphqlService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'action'];
  perPage: number = 5;
  totalData: number = 0;
  searchValue: string = "";

  ngOnInit(): void {
    this.loadProducts(1);
  }

  loadProducts(currentPage: number) {
    const paginationObject = {
      page: currentPage,
      limit: this.perPage,
      search: this.searchValue
    };

    this.graphqlService.getData(GET_PRODUCTS, paginationObject)
      .subscribe({
        next: (productData: any) => {
          this.dataSource = productData?.products?.data ?? [];
          this.totalData = productData?.products?.paginatorInfo?.total ?? 0;
        },
        error: err => console.error('Observable emitted an error: ' + err)
      });
  }

  applyFilter(event: Event) {
    this.searchValue = '%' + (event.target as HTMLInputElement).value + '%';
    this.loadProducts(1);
  }

  createProducts() {
    this.router.navigate(['products/create']);
  }

  openDialog(productDetails: any) {
    const customMessage = `You want to delete product ${productDetails.name}.`;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: 'Are you sure?', message: customMessage, modalData: productDetails.id },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.removeProduct(productDetails.id, dialogRef);
      }
    });
  }

  removeProduct(id: number | string, dialogRef: any) {
    const data = { 'id': id };
    this.graphqlService.mutateData(REMOVE_PRODUCT, data).subscribe({
      next: () => {
        this.loadProducts(1);
      },
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => {
        dialogRef.close();
      }
    });
  }

  redirectToProductEditPage(id: number | string) {
    this.router.navigate([`products/edit/${id}`]);
  }
}
