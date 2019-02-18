import { AuthService } from 'shared/services/auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth:AuthService) {
   
   }
login(){
  this.auth.login();  
//   let email:string="mathiammu02@gmail.com";
//   let pswd:string="V.gandhi02";
//   let displayName:string="mathiammu";

//  this.afAuth.auth.createUserWithEmailAndPassword(email,pswd).then(res=>{
//    res.additionalUserInfo.username=displayName;
//    console.log(res);});


//Method1

// var provider = new firebase.auth.GoogleAuthProvider();
// firebase.auth().signInWithRedirect(provider);

// firebase.auth().getRedirectResult().then(function(authData) {
// 	console.log(authData);
// }).catch(function(error) {
// 	console.log(error);
// });

//method2
 
}
}