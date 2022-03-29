import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthenticationService } from "../shared/authentication-service";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usersRef = collection(db,"users");
  profileName: string;
  profilePoints: number;
  photo: string;
  name: string;

  constructor(public authService: AuthenticationService, private firestore: AngularFirestore) { }


  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.photo = user.photoURL;
      this.name = user.displayName

      console.log("AUTH_USER",user)
      console.log(user.displayName)

      if(user){
       const result = this.firestore.doc(`/users/${user.uid}`);
       var userprofile = result.valueChanges();
       userprofile.subscribe( profile =>{
         console.log("PROFILE::", profile);
         this.profileName = profile['name']
         this.profilePoints = profile['points']
       })
      }

      
    })
  }

  
  
  

}
