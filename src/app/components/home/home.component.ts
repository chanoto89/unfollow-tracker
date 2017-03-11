import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  code: string;

  constructor(private httpService: HttpService, 
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.router
      .queryParams
      .subscribe((params: any) => {
        this.code = params['code'];
        
        if (this.code) {
          this.httpService.handleAuthentication(this.code)
          .then((response: string) => {
            console.log(response);
          });
        }
      });
  }

  instagramConnect() {
    this.httpService.authenticateInstagram()
    .then((response:string) => {
      window.location.href = response;
    })
    .catch((err:any) => {
      console.log(err);
    });
  }
}
