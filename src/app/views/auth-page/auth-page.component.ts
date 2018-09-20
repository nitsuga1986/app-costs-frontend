import { Component, OnInit } from '@angular/core';
import { Location  } from '@angular/common';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  location: Location;
  private authMode: any;

  constructor(  location: Location, public authService:AuthService, private router:Router) {
    this.location = location;
  }

  ngOnInit() {
    this.authMode = this.getTitle();
    if (this.authMode == '/logout'){
      console.log('logout!')
      this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
    }
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    return titlee;
  }

  isLoginMode(){return this.authMode == '/login'}
  isRegisterMode(){return this.authMode == '/register'}
}
