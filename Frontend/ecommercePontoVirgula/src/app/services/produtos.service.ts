import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProdutoModel } from '../models/produto/produto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private httpClient : HttpClient,private spinner: NgxSpinnerService) {} 

  public produto : Array<ProdutoModel> = new Array<ProdutoModel>();
  
  getProdutos() {
    return this.httpClient.get<Array<ProdutoModel>>(
      `${environment.endPoint}/produto`      
    );
  }
}
