import { AuthGuard } from 'shared/Services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { RouterModule } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { OrderService } from 'shared/services/order.service';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    CheckOutComponent,
    ShoppingCartComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
    ],
  imports: [
    SharedModule,   
    RouterModule.forChild([
      {
        path:"product",
        component:ProductsComponent
      },
      {
        path:"shopping-cart",
        component:ShoppingCartComponent
      },
      
      //logged user
      {
        path:"check-out",
        component:CheckOutComponent,
        canActivate:[AuthGuard]
      },
      {
        path:"my-orders",
        component:MyOrdersComponent,
        canActivate:[AuthGuard]
      },
      {
        path:"order-success/:id",
        component:OrderSuccessComponent,
        canActivate:[AuthGuard]
      },

    ])

  ],
  providers:[ 
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  exports:[
    ProductsComponent
  ]
})
export class ShoppingModule { }
