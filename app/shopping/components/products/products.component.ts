import { ShoppingCart } from 'shared/Models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category:string;
  products;
  filteredProducts:any[]=[];
  cart;
  constructor(
     private route:ActivatedRoute,
     private productService:ProductService,
     private shoppingCartService:ShoppingCartService) 
      {  } 

   async ngOnInit(){
    (await this.shoppingCartService.getCart()).subscribe(cart=>this.cart=cart.itemsList);
    this.populateProduct(); 
   } 

   private populateProduct(){
    this.productService.getAll().switchMap(p=>{
      this.products=p;
       return this.route.queryParamMap;
      })
      .subscribe(params=>{
      this.category=params.get('category');
      this.applyFilter();
   });         
   }

   private applyFilter(){
    this.filteredProducts=(this.category)?
       this.products.filter(p=>p.category.toLowerCase().includes(this.category.toLowerCase())) : 
       this.products;
     }

  //  private applyFilter(){
  //   if(this.category)
  //   {
  //     for(let i=0;i<20;i++)
  //     {
  //      this.category=this.category.toLowerCase();
  //       let cp:string=this.products[i].category;
  //       cp=cp.toLowerCase();
  //       if(this.category.match(cp))
  //       {
  //         this.filteredProducts.push(this.products[i]);
  //       }
  //      }         
  //   }
  //   else{
  //     this.filteredProducts=this.products;           
  //   }
  //  }
}
