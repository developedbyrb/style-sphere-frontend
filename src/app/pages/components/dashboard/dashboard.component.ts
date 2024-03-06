import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { GET_DASHBOARD_ANALYTICS } from './dashboard.graphql.operations';
import { map } from 'rxjs';

interface DashboardAnalytics {
  usersCount: number;
  categoriesCount: number;
  productsCount: number;
  shopsCount: number;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private graphqlService: GraphqlService,
  ) { }

  dashboardData: DashboardAnalytics = {
    usersCount: 0,
    categoriesCount: 0,
    productsCount: 0,
    shopsCount: 0,
  }

  ngOnInit(): void {
    this.getDashboardDetails();
  }

  getDashboardDetails() {
    this.graphqlService.getData(GET_DASHBOARD_ANALYTICS)
      .pipe(map(module => module.dashboardData))
      .subscribe({
        next: (response: DashboardAnalytics) => {
          this.dashboardData = response;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => { }
      });
  }
}
