import { Component, OnInit } from '@angular/core';
import { Location  } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  location: Location;

  constructor(location: Location) { this.location = location; }

  ngOnInit() {
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    console.log(titlee);
    return titlee;
  }

  isLoginMode(){return this.getTitle() == '/login'}
  isRegisterMode(){return this.getTitle() == '/register'}
}
