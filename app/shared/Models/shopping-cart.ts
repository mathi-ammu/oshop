import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-items';

export class ShoppingCart{
    public itemsList:{
         $key:string;
         value:{};
      }[]=[];
      items:ShoppingCartItem[]=[];


    constructor( item ){  
       this.itemsList=item;
      //  console.log("items",this.itemsList[1].value);
      if(!(this.itemsList[1]===undefined)){
         let key=Object.keys(this.itemsList[1].value);
          for(let k of key){       
               let p=this.itemsList[1].value[k].product.product;
               let q=this.itemsList[1].value[k].quantity;
              this.items.push(new ShoppingCartItem(p,q));
         }
        console.log("items",this.items);
       }
   }


get productIds(){
   // console.log("items",this.itemsList);
   if(!(this.itemsList[1]===undefined)){
   let keys=Object.keys(this.itemsList[1].value);
   // console.log("data",this.itemsList[0].value[keys[0]].product);
   return Object.keys(this.itemsList[1].value);
   }

}

get totalPrice(){
   let sum:number=0;
   if(!(this.itemsList[1]===undefined)){
   let len=Object.keys(this.itemsList[1].value).length;
   
   // console.log("items",this.items);
   // console.log("itemsList",this.itemsList);
   
   for(let i=0;i<len;i++){
      sum+=this.items[i].product.Price*this.items[i].quantity;
      // console.log("sum",sum);
   }
}
   // console.log("items",this.items);
   return sum;
}

 get totalItemsCount(){
        let value;
        let count=0;
      //   console.log("items",this.itemsList);
      if(!(this.itemsList[1]===undefined))
      {
        var item=Object.entries(this.itemsList[1].value);    
        var len=item.length;
        for(let i=0;i<len;i++){
            value=item[i][1];
            count+=value.quantity;
         }
          return count;

      }
 return 0;
}
}