import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario/usuario';
import { CartService } from 'src/app/services/cart.service';
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cabecalho-menu',
  templateUrl: './cabecalho-menu.component.html',
  styleUrls: ['./cabecalho-menu.component.scss']
})
export class CabecalhoMenuComponent implements OnInit {

  constructor(public CartService: CartService, @Inject(LOCAL_STORAGE) private storage: StorageService, private Router: Router, public LoginService: LoginService) { }

  

  ngOnInit(): void {
    if (!this.LoginService.usuarioChecado) {
      this.verificaSeUsuarioAdm();
    }
  }

  redirectToDashboard() {
    this.Router.navigate(["/dashboard"]);
  }
  redirectToCart() {
    this.Router.navigate(["/cart"]);
  }
  redirectToCadastroProduto() {
    this.Router.navigate(["/cadastro-produto"]);
  }

  verificaSeUsuarioAdm() {
    let numPromiseAll = 0;
    let onInits = [];
    let email = this.storage.get("Email")
    if (!email) {
      return;
    }
    onInits.push(
      this.LoginService.buscarUsuario(email)
        .toPromise()
        .then((response: any) => {
          if (!response) {
          } else {
            this.LoginService.usuario.Admin = response.admin;
            this.LoginService.usuarioChecado = true;
          }
        }),
    )
    Promise.all(onInits)
      .then((response) => {
        if (numPromiseAll == 0) {
        }
        numPromiseAll++
      })
      .catch((error: HttpErrorResponse) => {
      })
  }
}
