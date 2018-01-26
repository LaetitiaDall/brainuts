import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    return localStorage.setItem('token', token);
  }

}
