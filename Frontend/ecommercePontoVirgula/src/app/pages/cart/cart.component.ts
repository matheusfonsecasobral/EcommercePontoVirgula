import { Component, OnInit } from '@angular/core';
import { CartProdutoModel } from 'src/app/models/cart/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public CartService: CartService) { }

  ngOnInit(): void {
  }


  removerDoCarrinho(value:CartProdutoModel){
    this.CartService.removerDoCarrinho(value);
  }

  calcularPreco(item : CartProdutoModel){
    return (item.preco * item.quantidade).toFixed(2);
  }
}
