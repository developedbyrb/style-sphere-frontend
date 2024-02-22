import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private tokenService: TokenService, private apollo: Apollo) { }

  private userState = new BehaviorSubject<boolean>(this.tokenService.isLoggedIn()!);
  userAuthState = this.userState.asObservable();

  private userDetails = new BehaviorSubject<string>('');
  userAuthDetails = this.userDetails.asObservable();

  setAuthState(value: boolean) {
    this.userState.next(value);
  }

  setAuthDetails(value: string) {
    this.userDetails.next(value);
  }

  logout() {
    this.apollo.client.resetStore();
    this.tokenService.removeToken();
  }
}
