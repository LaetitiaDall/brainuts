import {Injectable} from '@angular/core';
import {User} from './user';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import {AuthService} from '../../systems/auth/auth.service';
import {UserUtils} from './user.utils';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {

  private mainUser: ReplaySubject<User>;
  private mainUserValue: User;

  constructor(private http: Http, private httpClient: HttpClient, private authService: AuthService) {
    this.mainUser = new ReplaySubject<User>(1);
    this.readCurrentUser();
  }

  readCurrentUser() {
    if (this.authService.getToken()) {
      this.me()
        .subscribe(user => {
            this.setMainUser(user);
          }
        );
    }
  }

  setMainUser(user: User) {
    this.mainUserValue = user;
    this.mainUser.next(user);
  }

  observeMainUser(): ReplaySubject<User> {
    return this.mainUser;
  }

  login(name: string, password: string) {
    console.log('Login with', name, password);
    return this.httpClient
      .post<User>(`${environment.api_url}/login`, {name: name, password: password}).subscribe(user => {
        this.setMainUser(user);
      });
  }

  me(): Observable<User> {
    return this.httpClient
      .get<User>(`${environment.api_url}/me`);
  }

  search(term: string): Observable<User[]> {
    return this.http
      .get(`${environment.api_url}/users/name/${term}`)
      .map(response => {
          console.log(response.json());
          return response.json() as User[];
        }
      );
  }
}
