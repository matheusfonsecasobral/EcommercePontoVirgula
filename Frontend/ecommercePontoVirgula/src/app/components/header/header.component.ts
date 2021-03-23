import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(public LoginService: LoginService, private Router: Router
  ) { }

  usuarioName: string = "Login";
  mostrarDropdown: boolean = false;
  hoverDropMenu : string = "";
  hoverItemMenu : string = "";
  ngOnInit(): void {
    if (this.LoginService.usuario.NomeCompleto.length) {
      this.usuarioName = this.LoginService.usuario.NomeCompleto
    }
  }

  acaoUsuario() {
    if (!this.LoginService.usuario.NomeCompleto.length) {
      this.Router.navigate(["/login"]);
    } else {
      this.mostrarDropdown = !this.mostrarDropdown;
    }
  }

  unhoverDropdown() {
    this.mostrarDropdown = false;
  }

  activeHoverDropdown(){
    this.hoverDropMenu = "dropdown-hover";
    this.hoverItemMenu = "item-hover";
  }

  desactiveHoverDropdown(){
    this.hoverDropMenu = "";
    this.hoverItemMenu = "";
  }

  logout(){
    this.Router.navigate(["/login"]);
  }
}
