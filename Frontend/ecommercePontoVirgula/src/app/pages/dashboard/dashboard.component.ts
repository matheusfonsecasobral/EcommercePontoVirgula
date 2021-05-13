import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartProdutoModel } from 'src/app/models/cart/cart';
import { ProdutoModel } from 'src/app/models/produto/produto';
import { CartService } from 'src/app/services/cart.service';
import { ProdutosService } from 'src/app/services/produtos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private Router: Router, public ProdutosService: ProdutosService, private toastr: ToastrService, private spinner: NgxSpinnerService, public CartService: CartService) { }

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

  adicionarAoCarrinho(item: any) {
    this.CartService.adicionarAoCarrinho(item)
    this.toastr.info(item.nome + ' adicionado ao carrinho com sucesso.',
      'Carrinho',
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right'
      });
      this.Router.navigateByUrl("/login");
  }
  
  redirectItem(id: number) {
    this.Router.navigate(["item", id])
  }
}