import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../common/components/header/header.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { SpinnerComponent } from '../common/components/spinner/spinner.component';

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
      link: "dashboard"
    },
    {
      name: "Users",
      link: "users"
    },
    {
      name: "Roles",
      link: "roles"
    },
    {
      name: "Products",
      link: "products"
    },
    {
      name: "Categories",
      link: "categories"
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
