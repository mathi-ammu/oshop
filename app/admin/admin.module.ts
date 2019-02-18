import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/Services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AdminOrdersViewComponent } from './components/admin-orders-view/admin-orders-view.component';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ViewOrdersComponent,
    AdminOrdersViewComponent,
  ],
  imports: [    
    SharedModule,
    RouterModule.forChild([              
      {
        path:"admin/products/new",
        component:ProductFormComponent,
        canActivate:[AuthGuard,AdminAuthGuard]
      },
      {
        path:"admin/products/:id",
        component:ProductFormComponent,
        canActivate:[AuthGuard,AdminAuthGuard]
      },
      {
        path:"admin/products",
        component:AdminProductsComponent,
        canActivate:[AuthGuard,AdminAuthGuard]
      },
      {
        path:"admin/order/:id",
        component:ViewOrdersComponent,
        canActivate:[AuthGuard]
      },   
      {
        path:"admin/orders/:id",
        component:AdminOrdersViewComponent,
        canActivate:[AuthGuard,AdminAuthGuard]
      },    
      {
        path:"admin/orders",
        component:AdminOrdersComponent,
        canActivate:[AuthGuard,AdminAuthGuard]
      }

    ])
  ]
})
export class AdminModule { }
