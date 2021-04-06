export class CartModel{
    numeroItensSelecionados : number = 0;
    listaDeProdutos : Array<CartProdutoModel> = []; 
    precoTotal : number = 0;
}

export class CartProdutoModel{    
    nome : string = '';
    descricao : string = '';
    preco: number = 0;
    estoque: number = 0;
    linkImg: string = '';
    quantidade: number = 0;
}