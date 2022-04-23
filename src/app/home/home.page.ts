import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthenticationService } from "../shared/authentication-service";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { collection, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { db } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from '@firebase/util';
import { stringify } from 'querystring';
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
  list: Array<{person: number}>

  constructor(public authService: AuthenticationService, private firestore: AngularFirestore) { 
    
  }
 


  ngOnInit() {
    firebase.auth().onAuthStateChanged(async user => {
      this.photo = user.photoURL;
      this.name = user.displayName;
      
      

      console.log("AUTH_USER",user)
      console.log(user.displayName)

      if(user){
       const result = this.firestore.doc(`/users/${user.uid}`);
       var userprofile = result.valueChanges();
       userprofile.subscribe( profile =>{
         console.log("PROFILE::", profile);
         this.profileName = profile['name']
         this.profilePoints = profile['points']
         document.getElementById('scoreboard').innerHTML = '';
         this.firestore.collection('users', ref => ref.orderBy('points' ,'desc')).get().toPromise().then((snapshot) => {
          snapshot.forEach((doc) => {
            
              document.getElementById('scoreboard').innerHTML += '<tr>' +
              '<td >' + '<ion-img style="height:65px; width: 65px; margin-left: auto; margin-right: auto" src=' + doc.data()['img'] +'></ion-img>' + '</td>' +
              '<td style="text-align: center">' + doc.data()['name'] + '</td>' +
              '<td style="text-align: center">' + doc.data()['points'] + ' Pts</td>' +
              '</tr>';
          })
      })
            
       })
       }

      
    })
    
  
  }

}
