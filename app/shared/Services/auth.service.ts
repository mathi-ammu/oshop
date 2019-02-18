import { UserService } from 'shared/services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
  user$:Observable<firebase.User>;

  constructor(private userService:UserService,private afAuth:AngularFireAuth,private route:ActivatedRoute) {
    this.user$=afAuth.authState;    
    console.log(this.user$);
   }

  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl",returnUrl);
     return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    return this.afAuth.auth.signOut();
  }
  get appUser$():Observable<any>
  {
    return this.user$
    .pipe(
       switchMap(user=>{
         if(user)
         {
         return this.userService.get(user.uid)
         }
        return Observable.of(null);
       }));
}
}
