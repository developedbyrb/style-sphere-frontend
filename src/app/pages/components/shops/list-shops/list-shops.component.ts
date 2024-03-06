import { Component } from '@angular/core';
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
export class ListShopsComponent {
  constructor(
    private router: Router,
    private matDialog: MatDialog
  ) { }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'email', 'phoneNumber', 'productCount', 'action'];
  perPage: number = 5;
  totalData: number = 0;
  searchValue: string = "";

  redirectTo(route: string) {
    this.router.navigate([`${this.router.url}/${route}`]);
  }

  openDialog(productDetails: any) {
    const customMessage = `You want to delete product ${productDetails.name}.`;
    const dialogRef = this.matDialog.open(DialogComponent, {
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
    console.log(data);
  }
}
