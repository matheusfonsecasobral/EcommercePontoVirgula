import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cabecalho-menu',
  templateUrl: './cabecalho-menu.component.html',
  styleUrls: ['./cabecalho-menu.component.scss']
})
export class CabecalhoMenuComponent implements OnInit {

  constructor(public CartService: CartService, private Router: Router) { }

  ngOnInit(): void {

  }

  redirectToDashboard(){
    this.Router.navigate(["/dashboard"]);
  }
  redirectToCart() {
    this.Router.navigate(["/cart"]);
  }
}
