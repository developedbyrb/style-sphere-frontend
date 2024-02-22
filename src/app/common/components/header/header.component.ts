import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string | null = '';
  sideNav: boolean = false;
  @Output() toggleSideNav: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
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
}
