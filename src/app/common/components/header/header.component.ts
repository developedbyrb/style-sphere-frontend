import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { MatBadgeModule } from '@angular/material/badge';
import { GraphqlService } from '../../services/graphql/graphql.service';
import { GET_CART_COUNT } from 'src/app/pages/components/cart-items/cart-items.graphql.schema';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string | null = '';
  sideNav: boolean = false;
  cartItems!: Observable<number>;
  @Output() toggleSideNav: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
    this.getCartDetails();
  }

  getCartDetails() {
    this.graphqlService.getData(GET_CART_COUNT)
      .pipe(map(module => module.getCartCount.cartCount))
      .subscribe({
        next: (count: number) => {
          this.graphqlService.setCartCount(count);
          this.cartItems = this.graphqlService.cartCountState;
        },
        error: err => console.error('Observable emitted an error: ' + err)
      });
  }

  openSideNav() {
    this.sideNav = !this.sideNav;
    this.toggleSideNav.emit(this.sideNav);
  }

  logout() {
    this.router.navigate(['/auth/login']);
    this.authService.setAuthState(false);
    this.authService.logout();
  }

  viewCartDetails() {
    this.router.navigate(['cart-items']);
  }
}
