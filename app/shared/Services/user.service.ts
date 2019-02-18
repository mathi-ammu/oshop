import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from 'shared/Models/app.user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private db:AngularFireDatabase) {  }

  save(user:firebase.User)
  {
     this.db.object('/users/'+ user.uid).update({
      name:user.displayName,
      email:user.email
    });
  }

  get(uid:string):Observable<any>{
    return this.db.object('/users/'+uid).valueChanges();
  }
  
}
