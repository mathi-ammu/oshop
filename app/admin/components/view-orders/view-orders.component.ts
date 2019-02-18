import { map } from 'rxjs/operators';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'shared/Services/auth.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  orders;
  id:string;
  product;
  constructor(private route:ActivatedRoute,private authService: AuthService,private orderService:OrderService ) {
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id){
      authService.user$.switchMap(u => orderService.getUser(u.uid)).subscribe(p=>{
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
