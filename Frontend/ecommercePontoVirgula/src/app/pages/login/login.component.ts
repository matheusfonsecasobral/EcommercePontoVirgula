import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorStyleName: boolean = false;
  errorStyleLogin: boolean = false;
  errorStylePassword: boolean = false;
  errorStyleConfirmPassword: boolean = false;
  loginMode: boolean = false;
  msgErrorName: string = '';
  msgErrorEmail: string = '';
  msgErrorPassword: string = '';
  msgErrorConfirmPassword: string = '';
  buttonTextLoginRegister: string = '';
  titleText: string = '';
  subtitleText: string = '';
  numPromiseAll: number = 0;

  constructor(private http: HttpClient,
    private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.titleText = !this.loginMode ? 'Crie sua conta agora!' : 'Conectar-se';
    this.subtitleText = !this.loginMode ? 'Já possui conta?' : 'Ainda não é registrado?';
    this.buttonTextLoginRegister = !this.loginMode ? "Cadastrar" : "Logar"
  }

  resetValuesError() {
    this.errorStyleName = false;
    this.errorStyleLogin = false;
    this.errorStylePassword = false;
    this.errorStyleConfirmPassword = false;
    this.msgErrorName = '';
    this.msgErrorEmail = '';
    this.msgErrorPassword = '';
    this.msgErrorConfirmPassword = '';
    this.titleText = !this.loginMode ? 'Crie sua conta agora!' : 'Conectar-se';
    this.subtitleText = !this.loginMode ? 'Já possui conta?' : 'Ainda não é registrado?';
    this.buttonTextLoginRegister = !this.loginMode ? "Cadastrar" : "Logar"
  }

  login() {
    this.resetValuesError();
    let completeName: string;
    let email: string;
    let senha: string;
    let passwordConfirm: string;

    if (!this.loginMode) {
      completeName = (<HTMLInputElement>document.getElementById("nome")).value
      email = (<HTMLInputElement>document.getElementById("email")).value
      senha = (<HTMLInputElement>document.getElementById("senha")).value
      passwordConfirm = (<HTMLInputElement>document.getElementById("confirmarSenha")).value

      if (completeName.length === 0) {
        this.errorStyleName = true;
        this.msgErrorName = "Nome deve ser preenchido."
      }

      if (email.length === 0) {
        this.errorStyleLogin = true;
        this.msgErrorEmail = "E-mail deve ser preenchido."
      }

      if (senha.length === 0) {
        this.errorStylePassword = true
        this.msgErrorPassword = "Senha deve ser preenchida."
      }

      if (passwordConfirm.length === 0) {
        this.errorStyleConfirmPassword = true;
        this.msgErrorConfirmPassword = "Confirmar Senha deve ser preenchido."
      }

      if (senha !== passwordConfirm) {
        this.errorStylePassword = true;
        this.errorStyleConfirmPassword = true;
        this.msgErrorConfirmPassword = "Senhas não são iguais"
      }

    } else {

      email = (<HTMLInputElement>document.getElementById("email")).value
      senha = (<HTMLInputElement>document.getElementById("senha")).value

      if (email.length === 0) {
        this.errorStyleLogin = true;
        this.msgErrorEmail = "E-mail deve ser preenchido."
      }

      if (senha.length === 0) {
        this.errorStylePassword = true
        this.msgErrorPassword = "Senha deve ser preenchida."
      }

      let usuario: UsuarioModel = new UsuarioModel();
      usuario.Email = email;
      usuario.Senha = senha;

      let onInits = [];
      this.numPromiseAll = 0;
      debugger
      onInits.push(
        this.loginService.validarLogin(usuario)
          .toPromise()
          .then((data: any) => { 
            console.log(data);
          }),
      )
      Promise.all(onInits)
        .then((data) => {
          if (this.numPromiseAll == 0) {

          }
          this.numPromiseAll++
        })
        .catch((error) => {

        })
    }
  }

  alterModeLoginRegister() {
    this.loginMode = !this.loginMode;
    this.titleText = !this.loginMode ? 'Crie sua conta agora!' : 'Conectar-se';
    this.subtitleText = !this.loginMode ? 'Já possui conta?' : 'Ainda não é registrado?';
    this.buttonTextLoginRegister = !this.loginMode ? "Cadastrar" : "Logar"
  }
}
