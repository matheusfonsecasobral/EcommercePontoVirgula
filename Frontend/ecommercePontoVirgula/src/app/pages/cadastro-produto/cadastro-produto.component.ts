import { HttpErrorResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner, Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { ProdutoModel } from 'src/app/models/produto/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {

  errorStyleNome: boolean = false;
  errorStyleDescricao: boolean = false;
  errorStylePreco: boolean = false;
  errorStyleEstoque: boolean = false;
  errorStyleImg: boolean = false;


  msgErrorNome: string = '';
  msgErrorDescricao: string = '';
  msgErrorPreco: string = '';
  msgErrorEstoque: string = '';
  msgErrorImg: string = '';


  nomeModel: string = '';
  descricaoModel: string = '';
  precoModel: number = 0;
  estoqueModel: number = 0;
  imgModel: string = '';

  constructor(private toastr: ToastrService, private ProdutosService: ProdutosService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  cadastroProduto() {
    this.resetarValores();

    let error: boolean = false;

    if (!this.nomeModel.length) {
      this.msgErrorNome = "Nome não pode ser vazio."
      this.errorStyleNome = true;
      error = true;
    }

    if (!this.descricaoModel.length) {
      this.msgErrorDescricao = "Descrição não pode ser vazio."
      this.errorStyleDescricao = true;
      error = true;
    }

    if (!this.precoModel) {
      this.msgErrorPreco = "Preço não pode ser vazio."
      this.errorStylePreco = true;
      error = true;
    }

    if (!this.estoqueModel) {
      this.msgErrorEstoque = "Estoque não pode ser vazio."
      this.errorStyleEstoque = true;
      error = true;
    }

    if (!this.imgModel.length) {
      this.msgErrorImg = "Imagem não pode ser vazia."
      this.errorStyleImg = true;
      error = true;
    }

    let produto: ProdutoModel = { 
      id : 0,
      nome: this.nomeModel,
      descricao: this.descricaoModel.toString().replace(/\r?\n/g, '<br />'),
      preco: this.precoModel,
      estoque: this.estoqueModel,
      linkImg: this.imgModel
    }

    if (error) {
      return;
    } else {
      let numPromiseAll = 0;
      let onInits = [];

      this.spinner.show();
      onInits.push(
        this.ProdutosService.cadastrarProduto(produto)
          .toPromise()
          .then((response: boolean) => {
            if (!response) {
            } else {
              this.spinner.hide();
              this.mensagemDeSucesso();
              this.resetarValores();
              this.resetarModels();
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

  resetarValores() {
    this.errorStyleNome = false;
    this.errorStyleDescricao = false;
    this.errorStylePreco = false;
    this.errorStyleImg = false;
    this.errorStyleEstoque = false;
    this.msgErrorNome = '';
    this.msgErrorDescricao = '';
    this.msgErrorPreco = '';
    this.msgErrorImg = '';
    this.msgErrorEstoque = '';
  }

  resetarModels() {
    this.nomeModel = '';
    this.descricaoModel = '';
    this.precoModel = 0;
    this.estoqueModel = 0;
    this.imgModel = '';
  }

  mensagemDeSucesso() {
    this.toastr.success('Novo item cadastrado com sucesso.',
      'Cadastrado com sucesso',
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right'
      });
  }

  mensagemDeFalha() {
    this.toastr.error('Aconteceu um erro inesperado, tente novamente.',
      'Erro inesperado',
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right'
      });
  }
}
