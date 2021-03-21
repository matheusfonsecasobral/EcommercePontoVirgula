import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(public LoginService: LoginService,
     ) { }

  usuarioName: string = "Login";

  ngOnInit(): void { 
    if (this.LoginService.usuario.NomeCompleto.length) {
      this.usuarioName = this.LoginService.usuario.NomeCompleto
    }
    document.body.classList.add("background-body");
  }

}
