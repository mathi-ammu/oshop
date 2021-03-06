import { AuthService } from './shared/Services/auth.service';
import { AuthGuard } from './shared/Services/auth-guard.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from 'shared/shared.module';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';

// import { DataTableModule } from 'ng-seven-datatable';
@NgModule({
  declarations: [
    AppComponent
  
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      {
        path:"",
        component:ProductsComponent
      },   
      {
        path:"login",
        component:LoginComponent
      }
    ])
  ],
  providers: [
    AdminAuthGuard,
    AuthGuard,
    AuthService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
