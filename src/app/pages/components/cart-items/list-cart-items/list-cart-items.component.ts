import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { GET_CART_ITEMS, REMOVE_CART_ITEM, UPDATE_CART_ITEMS_QTY } from '../cart-items.graphql.schema';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from 'src/app/common/components/dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cart-items',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    DialogComponent,
    MatDialogModule
  ],
  templateUrl: './list-cart-items.component.html',
  styleUrls: ['./list-cart-items.component.scss']
})
export class ListCartItemsComponent implements OnInit {
  constructor(
    private graphqlService: GraphqlService,
    private matDialog: MatDialog,
    private router: Router
  ) { }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'code', 'price_start', 'price_end', 'total_amount', 'action'];
  totalCartAmount: number = 0;
  quantity: number = 0;

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.graphqlService.getData(GET_CART_ITEMS)
      .pipe(map(data => data.cartItems))
      .subscribe({
        next: (response: any) => {
          this.dataSource = response;
          if (response.length > 0) {
            this.totalCartAmount = response.map((a: any) => a.total_amount).reduce(function (a: any, b: any) {
              return a * 1 + b * 1;
            });
          } else {
            this.totalCartAmount = 0;
          }
        },
        error: err => console.error('Observable emitted an error: ' + err)
      });
  }

  increment(data: any) {
    let quantity = data.qty;
    quantity++;
    this.updateCartItemsQty(data.id, quantity);
  }

  decrement(data: any) {
    let quantity = data.qty;
    quantity--;
    if (quantity > 0) {
      this.updateCartItemsQty(data.id, quantity);
    } else {
      console.log('can not');
    }
  }

  updateCartItemsQty(cartId: number, quantity: number) {
    const data = {
      id: cartId,
      qty: quantity
    }

    this.graphqlService.mutateData(UPDATE_CART_ITEMS_QTY, data)
      .pipe(map(module => module.data.updateCartItems.cartCount))
      .subscribe({
        next: (response: number) => {
          this.graphqlService.setCartCount(response);
          this.getCartItems();
        },
        error: err => console.error('Observable emitted an error: ' + err)
      });
  }

  openDialog(cartItem: any) {
    const customMessage = `You want to remove ${cartItem?.product?.name} from the cart?`;
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: { title: 'Are you sure?', message: customMessage, modalData: cartItem.id },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.removeCartItem(cartItem.id, dialogRef);
      }
    });
  }

  removeCartItem(id: number | string, dialogRef: any) {
    const data = { 'id': id };
    this.graphqlService.mutateData(REMOVE_CART_ITEM, data)
      .pipe(map(module => module.data.removeCartItem.cartCount))
      .subscribe({
        next: (response: number) => {
          this.graphqlService.setCartCount(response);
          this.getCartItems();
        },
        error: err => console.error('Observable emitted an error: ' + err),
        complete: () => {
          dialogRef.close();
        }
      });
  }

  checkout() {
    this.router.navigate(['orders/create']);
  }
}
