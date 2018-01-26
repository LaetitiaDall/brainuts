import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {Tag} from './tag';

@Injectable()
export class TagService {

  constructor(private http: Http, private httpClient: HttpClient) {

  }
  getAll(): Observable<Tag[]> {
    return this.httpClient
      .get<Tag[]>(`${environment.api_url}/tags`);
  }

}
