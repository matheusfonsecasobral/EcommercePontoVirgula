import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private Router: Router) { }
  private isAuthenticated: boolean = false;

  canActivate() {
    if (!this.isAuthenticated) { 
      this.Router.navigate(["/login"]);      
    }

    return this.isAuthenticated;
  }

  active() {
    this.isAuthenticated = true;
  }
}