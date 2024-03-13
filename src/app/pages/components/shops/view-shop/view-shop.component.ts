import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GET_SHOP_DETAILS } from '../shops.graphql.schemas';
import { map } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ADD_PRODUCT_TO_CART } from '../../cart-items/cart-items.graphql.schema';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-shop',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './view-shop.component.html',
  styleUrls: ['./view-shop.component.scss']
})
export class ViewShopComponent implements OnInit {
  constructor(
    private graphqlService: GraphqlService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

  shopId: number = 0;
  shopDetails: any = {};
  productColumns: string[] = ['name', 'stock', 'price', 'action'];
  addressColumns: string[] = ['line1', 'line2', 'city', 'state', 'country'];

  ngOnInit(): void {
    const shopId = this.activatedRoute.snapshot.params['id'];
    if (shopId) {
      this.shopId = Number(shopId);
      this.getShopDetails(shopId);
    } else {
      this.backToMain();
    }
  }

  getShopDetails(id: number) {
    const shopPostData = { id: id };
    this.graphqlService.getData(GET_SHOP_DETAILS, shopPostData)
      .pipe(map(module => module.shopDetails))
      .subscribe({
        next: (response) => {
          this.shopDetails = response;
        },
        error: err => console.error('Observable emitted an error: ' + err)
      })
  }

  addToCart(details: any) {
    const data = {
      'shop': Number(details.shop.id),
      'product': Number(details.product.id),
      'qty': "1",
      'price': String(details.selling_price)
    }
    this.graphqlService.mutateData(ADD_PRODUCT_TO_CART, data)
      .pipe(map(module => module.data.addToCart.cartCount))
      .subscribe({
        next: (count) => {
          this.graphqlService.setCartCount(count);
          this.matSnackBar.open('Product added to cart successfully!', 'Close', {
            duration: 3 * 1000,
          });
        },
        error: err => console.error('Observable emitted an error: ' + err)
      });
  }

  backToMain() {
    this.router.navigate(['/shops']);
  }
}
