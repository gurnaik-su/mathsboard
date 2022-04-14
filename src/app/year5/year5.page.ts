import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../shared/authentication-service';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

@Component({
  selector: 'app-year5',
  templateUrl: './year5.page.html',
  styleUrls: ['./year5.page.scss'],
})
export class Year5Page implements OnInit {

  photo: string;
  name: string;
  email: string;

  constructor(public authService: AuthenticationService, private firestore: AngularFirestore, public alertController: AlertController, public router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.photo = user.photoURL
      this.name = user.displayName
      this.email = user.email
      console.log(user)

      if (user) {
        const result = this.firestore.doc(`/users/${user.uid}`);
        var userprofile = result.valueChanges();
        userprofile.subscribe(profile => {
          console.log("PROFILE::", profile);
          profile['name'] = user.displayName
        })
      }
    }
    )
  }
  async comingSoon(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "Tutorials and Quiz's coming soon",
      buttons: [
        {
          text: 'Ok',
        }
      ]
    })
    await alert.present();
  }

}
