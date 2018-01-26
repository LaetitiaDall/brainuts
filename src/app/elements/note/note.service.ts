import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {Note} from './note';
import {User} from '../user/user';

@Injectable()
export class NoteService {

  constructor(private http: Http, private httpClient: HttpClient) {

  }

  remove(note: Note) {
    return this.httpClient
      .delete<Note>(`${environment.api_url}/notes/${note._id}`);
  }

  update(note: Note) {
    return this.httpClient
      .put<Note>(`${environment.api_url}/notes/${note._id}`, note);
  }

  create(content: string) {
    return this.httpClient
      .post<Note>(`${environment.api_url}/notes`, {content: content});
  }

  getAll(): Observable<Note[]> {
    return this.httpClient
      .get<Note[]>(`${environment.api_url}/notes`);
  }

  getAllTags(): Observable<Note[]> {
    return this.httpClient
      .get<Note[]>(`${environment.api_url}/tags`);
  }

  search(term: string): Observable<Note[]> {
    return this.httpClient
      .get<Note[]>(`${environment.api_url}/notes/search/${term}`);
  }
}
