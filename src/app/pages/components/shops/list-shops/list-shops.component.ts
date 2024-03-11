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
import { DialogComponent } from 'src/app/common/components/dialog/dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { GET_SHOPS } from '../shops.graphql.schemas';

@Component({
  selector: 'app-list-shops',
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
  templateUrl: './list-shops.component.html',
  styleUrls: ['./list-shops.component.scss']
})
export class ListShopsComponent implements OnInit {
  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private graphqlService: GraphqlService
  ) { }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'email', 'phoneNumber', 'productCount', 'action'];
  perPage: number = 5;
  totalData: number = 0;
  searchValue: string = "";

  ngOnInit(): void {
    this.loadShops(1);
  }

  loadShops(currentPage: number) {
    const paginationObject = {
      page: currentPage,
      limit: this.perPage,
      search: this.searchValue
    };

    this.graphqlService.getData(GET_SHOPS, paginationObject)
      .subscribe({
        next: (shopsData: any) => {
          this.dataSource = shopsData?.shops?.data ?? [];
          this.totalData = shopsData?.shops?.paginatorInfo?.total ?? 0;
        }
      });
  }

  redirectTo(route: string) {
    this.router.navigate([`${this.router.url}/${route}`]);
  }

  openDialog(shopDetails: any) {
    const customMessage = `You want to delete shop ${shopDetails.name}.`;
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: { title: 'Are you sure?', message: customMessage, modalData: shopDetails.id },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.removeShop(shopDetails.id, dialogRef);
      }
    });
  }

  removeShop(id: number | string, dialogRef: any) {
    const data = { 'id': id };
    console.log(data);
  }
}
