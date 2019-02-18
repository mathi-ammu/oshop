
import { Product } from 'shared/Models/product';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {  DataTableResource } from 'angular5-data-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  //  products:Product[]=[{} as Product];
  items:Product[]=[];
  limits = [10, 20, 40, 80];
 products;
  itemCount:number;
  tableResource:DataTableResource<Product>;  
  filteredProducts=[];

  constructor(private router:Router, private productService:ProductService) { 
    this.productService.getAll()
      .subscribe(p=>{
        this.products=p;
        this.initializeTable(p);
      });    
  }

  private initializeTable(product){
    this.tableResource=new DataTableResource(product);
        this.tableResource.query({offset:0})
          .then(items=>this.items=items);
          this.tableResource.count()
            .then(count=>this.itemCount=count);
  }



  filter(query:string){
     this.filteredProducts=(query)?
        this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())) : 
        this.products;
        this.initializeTable(this.filteredProducts);
      }

    reloadItems(params){
      if(!this.tableResource) return;

      this.tableResource.query(params)
          .then(items=>this.items=items);

    } 
}
