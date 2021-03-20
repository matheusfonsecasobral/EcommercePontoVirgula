import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioLoginModel, UsuarioModel } from '../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient ) {} 

  validarLogin(usuarioModel: UsuarioLoginModel) {
    return this.httpClient.post<any>(
      `${environment.endPoint}/usuario/validation`,
      usuarioModel
    );
  }

  cadastrarUsuario(usuarioModel: UsuarioModel) {
    return this.httpClient.post<boolean>(
      `${environment.endPoint}/usuario/`,
      usuarioModel
    );
  }
}
