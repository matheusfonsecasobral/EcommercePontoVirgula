import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient : HttpClient,private spinner: NgxSpinnerService ) {} 

  public usuario: UsuarioModel = new UsuarioModel;

  validarLogin(usuarioModel: UsuarioModel) {
    return this.httpClient.post<UsuarioModel>(
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

  iniciarSpinner(){
    this.spinner.show();
  }

  fecharSpinner(){
    this.spinner.hide();
  }
}
