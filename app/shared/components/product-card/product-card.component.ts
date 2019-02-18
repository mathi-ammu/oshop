import { ShoppingCart } from 'shared/Models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/Models/product';
import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartItem } from 'shared/Models/shopping-cart-items';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product:Product;
  @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart;
 
  constructor(private cartService:ShoppingCartService) {  }

  addToCard(){
     this.cartService.addToCart(this.product);

  }

  removeFromCart(){
      this.cartService.removeFromCart(this.product);
  }

   getQuantity(){
    let items;
    let value;
    if(!this.shoppingCart) return 0;
    if(!(this.shoppingCart[1]===undefined))
    {
      items=this.shoppingCart[1].value;
      var item=Object.entries(items);
      var len=item.length;
      for(let i=0;i<len;i++)
      {
        if(item[i].toString().match(this.product.$key))
        {
        value=Object.values(item[i])[1];
        return value.quantity;
        }
      }
    }
    
     return 0;     
  } 
}
