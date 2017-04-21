import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class DbService {

  constructor(public http: Http) { }

  getUser() {
    return this.http.get('http://jsonplaceholder.typicode.com/users/1');
  }

  getPosts(){
    return this.http.get('http://jsonplaceholder.typicode.com/posts?userId=1')
  }
}
