import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private Router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService) { }
  private isAuthenticated: boolean = false;

  canActivate() {
    this.isAuthenticated = this.storage.get("isAuthenticated");
    if (!this.isAuthenticated) {
      this.Router.navigateByUrl("/login");
    }

    return this.isAuthenticated;
  }

  active(nomeCompleto: string, email : string) {
    this.isAuthenticated = true;
    this.storage.set("isAuthenticated", this.isAuthenticated);
    this.storage.set("NomeCompleto", nomeCompleto);
    this.storage.set("Email", email);
  }

  desactive() {
    this.isAuthenticated = false;
    this.storage.set("isAuthenticated", this.isAuthenticated);
    this.storage.set("NomeCompleto", "");
    this.storage.set("Email", "");
  }
}