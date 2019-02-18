import { Observable } from 'rxjs/Observable';
import { ProductService } from 'shared/services/product.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from 'shared/Models/product';
import 'rxjs/add/operator/take';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/Models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase,private ps:ProductService) { }

  async getCart()
  {
    let cartId= await this.getOrCreateCartId();
    return  this.db.list('/shopping-carts/'+cartId+'/').snapshotChanges().pipe(map(values => {return new ShoppingCart( values.map(v => ({$key: v.key, value:v.payload.val()})))}));   
  }

 async addToCart(product: Product)
  {
  this.updateItemQuantity(product,1);      
  }

async removeFromCart(product:Product)
{
  this.updateItemQuantity(product,-1);    
}

async clearCart(){
  let cartId=await this.getOrCreateCartId();
  this.db.object('/shopping-carts/'+cartId+'/items').remove();
}

 private create(){
    return this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItems(cartId:string,productId:string){
    return this.db.object('/shopping-carts/' + cartId + '/items/ '+ productId).valueChanges();
  }

private async getOrCreateCartId(){
    let cartId=localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result=await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }


private async updateItemQuantity(product:Product,change:number){
  let  cartId = await this.getOrCreateCartId();
   
      let item$=this.db.object('/shopping-carts/' + cartId + '/items/ '+ product.$key);   
       item$.snapshotChanges()
        .take(1)
        .subscribe(i => {        
          item$.update({
            product:{product:{"Title":product.title,"category":product.category,"imageUrl":product.imageUrl,"Price":product.price} },
            quantity: ((i.payload.hasChild('quantity')) ? i.payload.val()['quantity'] + change || 0 : 1)
          });
        });
      }
}

