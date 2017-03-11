import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  authenticateInstagram(): void {
    this.http.get('/api/authenticateInstagram');

  }
}
