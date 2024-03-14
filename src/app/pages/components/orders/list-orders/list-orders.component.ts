import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'code', 'price_start', 'price_end', 'total_amount', 'action'];
  totalCartAmount: number = 0;
  quantity: number = 0;
}
