import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {Note} from './note';

@Injectable()
export class NoteService {

  constructor(private http: Http, private httpClient: HttpClient) {

  }

  search(term: string): Observable<Note[]> {
    return this.http
      .get(`${environment.api_url}/notes/search/${term}`)
      .map(response => {
          console.log(response.json());
          return response.json() as Note[];
        }
      );
  }
}
