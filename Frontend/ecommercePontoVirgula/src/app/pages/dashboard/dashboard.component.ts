import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartProdutoModel } from 'src/app/models/cart/cart';
import { ProdutoModel } from 'src/app/models/produto/produto';
import { CartService } from 'src/app/services/cart.service';
import { ProdutosService } from 'src/app/services/produtos.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public ProdutosService: ProdutosService, private spinner: NgxSpinnerService, public CartService : CartService) { }

  ngOnInit(): void {
    this.carregarDashboard()
  }


  carregarDashboard() {
    let numPromiseAll = 0;
    let onInits = [];

    this.spinner.show();
    onInits.push(
      this.ProdutosService.getProdutos()
        .toPromise()
        .then((response: Array<ProdutoModel>) => {
          if (!response) {
          } else {
            this.spinner.hide();
            this.ProdutosService.produto = response
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

  adicionarAoCarrinho(item : CartProdutoModel){
    this.CartService.adicionarAoCarrinho(item)
  }
}