import { AngularFireDatabase} from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Product } from 'shared/Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product:Product){
   return  this.db.list('/products').push(product);
  }

  getAll(){
    // return this.db.list('/products').snapshotChanges();
   return this.db.list('/products/').snapshotChanges().pipe(map(values => {return values.map(v => ({$key: v.key, ...v.payload.val()} ))}));
  }

  getProduct(productId:string){    
    return this.db.object('/products/'+productId).valueChanges();

  }
//   getAll()
// { 
//   return this.db.list('/products/').snapshotChanges().pipe(map(action=>{
//     return action.map(item=>{
//       const key =item.payload.key;
//       const data={key , ...item.payload.val()};
//       return data;
//     });
//   }));
// }

update(productId:string, product:Product)
{
return this.db.object('/products/'+productId).update(product);
}

delete(productId:string){
  return this.db.object('/products/'+productId).remove();
}
}
