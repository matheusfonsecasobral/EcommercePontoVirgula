import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProdutoModel } from 'src/app/models/produto/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public ProdutosService: ProdutosService) { }

  ngOnInit(): void {
    this.carregarDashboard()
  }


  carregarDashboard() {
    let numPromiseAll = 0;
    let onInits = [];


    onInits.push(
      this.ProdutosService.getProdutos()
        .toPromise()
        .then((response: Array<ProdutoModel>) => {
          if (!response) {
          } else {            
            debugger
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
}