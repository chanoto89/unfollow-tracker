import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  authenticateInstagram(): Promise<string> {
    return this.http.get('/api/instagram/authenticate')
      .toPromise()
      .then(response => response.json() as string)
      .catch((err) => console.log(err));
  }

  handleAuthentication(code: string): Promise<string> {
    return this.http.post('/api/instagram/authenticated', { code: code })
      .toPromise()
      .then(response => response.json() as string)
      .catch((err) => console.log(err));
  }
}
