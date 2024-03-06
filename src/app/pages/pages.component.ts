import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../common/components/header/header.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { SpinnerComponent } from '../common/components/spinner/spinner.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    SpinnerComponent,
    MatIconModule,
    NgFor,
    NgIf
  ],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      name: "Dashboard",
      link: "dashboard",
      icon: "dashboard"
    },
    {
      name: "Users",
      link: "users",
      icon: "group"
    },
    {
      name: "Roles",
      link: "roles",
      icon: "manage_accounts"
    },
    {
      name: "Products",
      link: "products",
      icon: "inventory_2"
    },
    {
      name: "Categories",
      link: "categories",
      icon: "category"
    },
    {
      name: "Shops",
      link: "shops",
      icon: "storefront"
    },
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }
}
