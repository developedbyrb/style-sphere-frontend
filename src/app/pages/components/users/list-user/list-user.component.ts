import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GET_USERS, REMOVE_USER } from '../users.graphql.operations';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/components/dialog/dialog.component';
import { GraphqlService } from 'src/app/common/services/graphql/graphql.service';
import { MatChipsModule } from '@angular/material/chips';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-user',
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
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private graphqlService: GraphqlService
  ) { }

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchValue: string = '%%';
  pageSizes: number[] = [5, 10, 25, 50];
  totalData: number = 0;
  perPage: number = 5;
  color: string = 'accent';
  filePath: string = environment.baseUrl;

  ngOnInit(): void {
    this.loadUsers(1);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers(currentPage: number) {
    const paginationObject = {
      page: currentPage,
      limit: this.perPage,
      search: this.searchValue
    };

    this.graphqlService.getData(GET_USERS, paginationObject)
      .subscribe({
        next: (usersData: any) => {
          this.dataSource = usersData?.users?.data ?? [];
          this.totalData = usersData?.users?.paginatorInfo?.total ?? 0;
        },
        error: err => console.log('Observable emitted an error: ' + err.message)
      });
  }

  applyFilter(event: Event) {
    this.searchValue = '%' + (event.target as HTMLInputElement).value + '%';
    this.loadUsers(1);
  }

  createUser() {
    this.router.navigate(['users/create']);
  }

  openDialog(userDetails: any) {
    const customMessage = `You want to delete user ${userDetails.name}.`;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: 'Are you sure?', message: customMessage, modalData: userDetails.id },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.removeUser(userDetails.id, dialogRef);
      }
    });
  }

  removeUser(id: number | string, dialogRef: any) {
    const data = { 'id': id };
    this.graphqlService.mutateData(REMOVE_USER, data).subscribe({
      next: () => {
        this.loadUsers(1);
      },
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => {
        dialogRef.close();
      }
    });
  }

  redirectToUserEditPage(id: number | string) {
    this.router.navigate([`users/edit/${id}`]);
  }

  onChangePage(event: PageEvent) {
    const currentPage = +event.pageIndex + 1; // get the current page
    this.perPage = +event.pageSize; // get the pageSize

    this.loadUsers(currentPage);
  }
}
