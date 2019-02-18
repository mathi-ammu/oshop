import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders-view',
  templateUrl: './admin-orders-view.component.html',
  styleUrls: ['./admin-orders-view.component.css']
})
export class AdminOrdersViewComponent implements OnInit {
  id:string;
  product;
  constructor(private route:ActivatedRoute,private orderService:OrderService ) {
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id){
       this.orderService.getAll().subscribe(p=>{
        for(let pro of p)
        {
          if(this.id.match(pro["datePlaced"])){
            this.product=pro["items"];
          }

        }        
      });
   }
  }

  ngOnInit() {
  }

}
