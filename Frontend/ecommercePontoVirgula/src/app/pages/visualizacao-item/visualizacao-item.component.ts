import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartProdutoModel } from 'src/app/models/cart/cart';
import { ProdutoModel } from 'src/app/models/produto/produto';
import { CartService } from 'src/app/services/cart.service';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-visualizacao-item',
  templateUrl: './visualizacao-item.component.html',
  styleUrls: ['./visualizacao-item.component.scss']
})
export class VisualizacaoItemComponent implements OnInit {

  constructor(private router: Router, private toastr : ToastrService, private CartService : CartService, private ActivatedRoute: ActivatedRoute, private ProdutosService: ProdutosService, private spinner: NgxSpinnerService) { }

  id: number = 0;
  produto = new ProdutoModel;

  ngOnInit(): void {
    this.spinner.show();
    this.id = this.ActivatedRoute.snapshot.params.id;
    this.verificaSeIdExiste()
  }

  verificaSeIdExiste() {
    let numPromiseAll = 0;
    let onInits = [];


    onInits.push(
      this.ProdutosService.buscarProdutoPorId(this.id)
        .toPromise()
        .then((response: ProdutoModel) => {
          if (!response) {
            this.router.navigate(["/dashboard"]);
          } else {
            this.produto = response;
            this.carregarPagina();
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

  carregarPagina() {
    let descricao: any
    descricao = document.getElementById('descricao')
    descricao.innerHTML = this.produto.descricao ? this.produto.descricao : "Produto não possui descrição.";
    this.spinner.hide();
  }

  adicionarCarrinho() {
    let cardProduto : CartProdutoModel = {
      id : this.produto.id,
      nome : this.produto.nome,
      descricao  : this.produto.descricao,
      preco : this.produto.preco,
      estoque : this.produto.estoque,
      linkImg : this.produto.linkImg,
      quantidade : 1,
    };

    this.CartService.adicionarAoCarrinho(cardProduto)
    this.toastr.info(cardProduto.nome + ' adicionado ao carrinho com sucesso.',
      'Carrinho',
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right'
      });
  }
}

