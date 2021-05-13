import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { UsuarioModel } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/services/login.service';
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(public LoginService: LoginService, private Router: Router,
    private AuthGuardService: AuthGuardService,
    @Inject(LOCAL_STORAGE) private storage: StorageService

  ) { }

  usuarioName: string = "Login";
  mostrarDropdown: boolean = false;
  hoverDropMenu: string = "";
  hoverItemMenu: string = "";

  ngOnInit(): void {
    if (this.LoginService.usuario.NomeCompleto.length) {
      this.usuarioName = this.LoginService.usuario.NomeCompleto
    } else {
      if (this.storage.get("isAuthenticated")) {
        this.usuarioName = this.storage.get("NomeCompleto") 
      }
    }
  }

  acaoUsuario() {
    if (this.usuarioName === "Login") {
      this.Router.navigateByUrl("/login");
    } else {
      this.mostrarDropdown = !this.mostrarDropdown;
    }
  }

  unhoverDropdown() {
    this.mostrarDropdown = false;
  }

  activeHoverDropdown() {
    this.hoverDropMenu = "dropdown-hover";
    this.hoverItemMenu = "item-hover";
  }

  desactiveHoverDropdown() {
    this.hoverDropMenu = "";
    this.hoverItemMenu = "";
  }

  logout() {
    this.Router.navigateByUrl("/login");
    this.AuthGuardService.desactive();
  }
}
