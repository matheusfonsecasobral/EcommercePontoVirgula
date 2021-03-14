import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient ) {} 

  validarLogin(usuarioModel: UsuarioModel) {
    return this.httpClient.post<any>(
      `${environment.endPoint}/usuario/validation`,
      usuarioModel
    );
  }
}
