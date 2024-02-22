import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isValidToken(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
  }

  storeName(name: string) {
    localStorage.setItem('user_name', name);
  }

  getUserName(): string | null {
    return localStorage.getItem('user_name');
  }
}
