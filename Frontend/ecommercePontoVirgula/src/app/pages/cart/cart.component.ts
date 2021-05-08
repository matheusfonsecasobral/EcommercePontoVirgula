import { Component, OnInit } from '@angular/core';
import { CartProdutoModel } from 'src/app/models/cart/cart';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public CartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  removerDoCarrinho(value: CartProdutoModel) {
    this.CartService.removerDoCarrinho(value);
    this.toastr.info(value.nome + ' removido com sucesso.',
      'Remover',
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right'
      });
  }

  calcularPreco(item: CartProdutoModel) {
    return (item.preco * item.quantidade).toFixed(2);
  }

  finalizarCompra() {
    this.toastr.success('Obrigado por comprar conosco. Você receberá um e-mail em breve com todas as informações.',
      'Compra finalizada!',
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right'
      });
    this.CartService.finalizarCompra();

  } 
}
