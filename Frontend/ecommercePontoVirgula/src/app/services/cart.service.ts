import { Injectable } from '@angular/core';
import { CartModel, CartProdutoModel } from '../models/cart/cart';
import { ProdutoModel } from '../models/produto/produto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  public cart: CartModel = new CartModel();



  adicionarAoCarrinho(item: CartProdutoModel) {

    let cartProduct: number = this.cart.listaDeProdutos.findIndex(i => i.nome === item.nome);

    if (cartProduct !== -1) {
      this.cart.listaDeProdutos[cartProduct].quantidade++;
    } else {
      item.quantidade = 1;
      this.cart.listaDeProdutos.push(item);
    }

    this.cart.precoTotal += item.preco;
    this.cart.numeroItensSelecionados++;
  }

  removerDoCarrinho(item: CartProdutoModel) {
    let cartProduct: number = this.cart.listaDeProdutos.indexOf(item);
    this.cart.numeroItensSelecionados -= this.cart.listaDeProdutos[cartProduct].quantidade;
    this.cart.precoTotal -= (this.cart.listaDeProdutos[cartProduct].preco * this.cart.listaDeProdutos[cartProduct].quantidade);
    this.cart.listaDeProdutos.splice(cartProduct, 1);
  }

  finalizarCompra() {
    this.cart = new CartModel(); ;
  }

}
