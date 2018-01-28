import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {Tag} from './tag';
import {Note} from '../note/note';

@Injectable()
export class TagService {

  constructor(private http: Http, private httpClient: HttpClient) {

  }

  getAll(): Observable<Tag[]> {
    return this.httpClient
      .get<Tag[]>(`${environment.api_url}/tags`);
  }

  remove(tag: Tag) {
    return this.httpClient
      .delete<Tag>(`${environment.api_url}/tags/${tag._id}`);
  }

  update(tag: Tag) {
    return this.httpClient
      .put<Tag>(`${environment.api_url}/tags/${tag._id}`, tag);
  }



}
