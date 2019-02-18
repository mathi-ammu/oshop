import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private db:AngularFireDatabase) {
   }

  getAll(){
    // return this.db.list('/categories/',ref=>{
    // return ref.orderByChild("name");      
    // }).valueChanges();
    return this.db.list('/categories/').snapshotChanges().pipe(map(values => {return values.map(v => ({$key: v.key, ...v.payload.val()} ))}));        
  }
}
