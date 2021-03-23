import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ROUTER_CONFIGURATION } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { UsuarioModel } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";

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
  loginMode: boolean = true;
  msgErrorName: string = '';
  msgErrorEmail: string = '';
  msgErrorPassword: string = '';
  msgErrorConfirmPassword: string = '';
  buttonTextLoginRegister: string = '';
  titleText: string = '';
  subtitleText: string = '';
  numPromiseAll: number = 0;
  sucessoAoCadastrar: boolean = false;

  constructor(private http: HttpClient,
    private loginService: LoginService,
    private authGuard: AuthGuardService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  ngOnInit(): void {
    
    if (this.storage.get("isAuthenticated") !== null) {
      if (this.storage.get("isAuthenticated")) {
        this.router.navigate(["/dashboard"])
      }
    }

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
      let validationError: boolean = false;

      if (!completeName.length) {
        this.errorStyleName = true;
        this.msgErrorName = "Nome deve ser preenchido."
        validationError = true;
      }

      if (!email.length) {
        this.errorStyleLogin = true;
        this.msgErrorEmail = "E-mail deve ser preenchido."
        validationError = true;
      }

      if (!senha.length) {
        this.errorStylePassword = true
        this.msgErrorPassword = "Senha deve ser preenchida."
        validationError = true;
      }

      if (!passwordConfirm.length) {
        this.errorStyleConfirmPassword = true;
        this.msgErrorConfirmPassword = "Confirmar Senha deve ser preenchido."
        validationError = true;
      }

      if (senha !== passwordConfirm) {
        this.errorStylePassword = true;
        this.errorStyleConfirmPassword = true;
        this.msgErrorConfirmPassword = "Senhas não são iguais"
        validationError = true;
      }

      if (validationError) {
        return;
      }

      let usuario: UsuarioModel = {
        Email: email,
        Senha: senha,
        NomeCompleto: completeName
      }

      let onInits = [];
      this.numPromiseAll = 0;
      onInits.push(
        this.loginService.cadastrarUsuario(usuario)
          .toPromise()
          .then((response: boolean) => {
            console.log(response);
            if (!response) {
              this.errorStyleConfirmPassword = true;
              this.msgErrorPassword = "Erro ao cadastrar-se.";
            } else {
              this.sucessoAoCadastrar = true;

              setTimeout(() => {
                this.loginMode = true;
                this.sucessoAoCadastrar = false;
                (<HTMLInputElement>document.getElementById("email")).value = "";
                (<HTMLInputElement>document.getElementById("senha")).value = "";
              }, 3000);
            }
          }),
      )
      Promise.all(onInits)
        .then((response) => {
          if (this.numPromiseAll == 0) {
          }
          this.numPromiseAll++
        })
        .catch((error: HttpErrorResponse) => {
          this.errorStylePassword = true;
          this.msgErrorPassword = "Erro ao conectar-se.";
          console.log(error.statusText, error.message, error.url)
        })

    } else {
      let validationError: boolean = false;
      email = (<HTMLInputElement>document.getElementById("email")).value
      senha = (<HTMLInputElement>document.getElementById("senha")).value

      if (!email.length) {
        this.errorStyleLogin = true;
        this.msgErrorEmail = "E-mail deve ser preenchido."
        validationError = true;
      }

      if (!senha.length) {
        this.errorStylePassword = true
        this.msgErrorPassword = "Senha deve ser preenchida."
        validationError = true;
      }


      let usuario: UsuarioModel = {
        Email: email,
        Senha: senha,
        NomeCompleto: ''
      };

      if (validationError) {
        return;
      }

      let onInits = [];
      this.numPromiseAll = 0; 
      this.loginService.iniciarSpinner();
      onInits.push(
        this.loginService.validarLogin(usuario)
          .toPromise()
          .then((response: any) => {
            if (!response) {
              this.errorStylePassword = true;
              this.msgErrorPassword = "E-mail/Senha incorretos";
            } else {
             
              this.loginService.usuario.NomeCompleto = response.nomeCompleto; 
              this.loginService.usuario.Email = response.email;
              this.loginService.usuario.Senha = response.senha;
              this.authGuard.active(response.nomeCompleto)
              this.router.navigate(['/dashboard']);
            }
          }),
      )
      Promise.all(onInits)
        .then((response) => {
          if (this.numPromiseAll == 0) {
            this.loginService.fecharSpinner();
          }
          this.numPromiseAll++
        })
        .catch((error: HttpErrorResponse) => {
          this.errorStylePassword = true;
          this.msgErrorPassword = "Erro ao conectar-se.";
          console.log(error.statusText, error.message, error.url)
          this.loginService.fecharSpinner();
        })


    }
  }

  alterModeLoginRegister() {
    this.loginMode = !this.loginMode;
    this.resetValuesError();
  }
}
