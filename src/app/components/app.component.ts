import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  scrollDownToNavbar() {
    var navbarElement = document.getElementById('navbar');
    var navbarY = navbarElement.getBoundingClientRect().top + window.scrollY;
    
    var windowY = window.pageYOffset || document.documentElement.scrollTop;;

    var scrollInterval = setInterval(function() {
      if (windowY >= navbarY) {
        clearInterval(scrollInterval);
      }

      windowY += 10;

      window.scrollTo(0, windowY);
    }, 5);
  }
}
