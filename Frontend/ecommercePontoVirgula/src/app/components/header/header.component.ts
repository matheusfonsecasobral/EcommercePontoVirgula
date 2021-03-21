import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public LoginService : LoginService) { }

  ngOnInit(): void {
    this.LoginService.usuario?.NomeCompleto;
  }

}
