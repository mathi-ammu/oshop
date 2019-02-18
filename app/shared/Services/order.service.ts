
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

 getAll(){
    return this.db.list('/orders',ref => ref.orderByChild('datePlaced')).valueChanges(); 
  }
 
  getAllByUser(userId: string){
    // https://stackoverflow.com/questions/47129039/query-does-not-exist-in-type-queryfn-angularfire2
   return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  
  }
  getUser(userId: string){
    // https://stackoverflow.com/questions/47129039/query-does-not-exist-in-type-queryfn-angularfire2
   return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  
  }

  // getOrder(userId:string,id:string){    
  //   return this.db.list('/orders',ref=>ref.orderByChild('datePlaced').equalTo(id)).valueChanges();
  // }

  
  
}
