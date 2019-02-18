export class ShoppingCartItem{
    constructor(public product,public quantity:number){        
    }
    get totalPrice(){         
        return this.product.Price * this.quantity;
    }
}