import { AppUser } from 'shared/Models/app.user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit, Input} from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/Models/shopping-cart';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{

  appUser:AppUser;
  showCart=""; 
  cart$:Observable<ShoppingCart>;
  constructor(private auth:AuthService,private shoppingCartService:ShoppingCartService,private route:Router) {  
  }

  logout(){
    this.auth.logout();
    this.route.navigate(['/']);
  }
  

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser=>this.appUser=appUser);
    this.cart$ = await this.shoppingCartService.getCart(); 
    
  }
}
