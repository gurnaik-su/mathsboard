import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication-service";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { db } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { collection, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  photo: string;
  name: string;
  email: string;
  profilePoints: number;
  level: number
  xpNeeded: number
  progress: number;
  usersRef = collection(db,"users");

  constructor(public authService: AuthenticationService, private firestore: AngularFirestore,    public alertController: AlertController) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.photo = user.photoURL
      this.name = user.displayName
      this.email = user.email

      if(user){
        const result = this.firestore.doc(`/users/${user.uid}`);
        var userprofile = result.valueChanges();
        userprofile.subscribe( profile =>{
          console.log("PROFILE::", profile);
          this.profilePoints = profile['points']
          this.level = Math.trunc(this.profilePoints / 50)
          this.xpNeeded = 50 - Math.trunc(this.profilePoints % 50)
          this.progress = Math.trunc(this.profilePoints % 50) / 50
        })
       }
    }

    
    )}

    async editPass() {
        this.authService.PasswordRecover(this.email);
      }

      async editUsername() {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Enter New Username',
          inputs: [
            {
              name: 'username',
              type: 'text',
              placeholder: 'username'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: data => {
                firebase.auth().onAuthStateChanged(user => {
                  user.updateProfile({
                    displayName: data.username
                  })
                  setDoc(doc(this.usersRef,user.uid), {
                    name: data.username ,
                    points: this.profilePoints
                  }).then(() => {
                    console.log("Successful")})
                    .catch((error) => {
                    console.log(`Unsuccessful returned error ${error}`)})
                  
                })
                
              }
            }
          ]
        });
    
        await alert.present();
      }

      async editEmail(){
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Enter New E-Mail',
          inputs: [
            {
              name: 'email',
              type: 'text',
              placeholder: 'E-Mail'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: data => {
                firebase.auth().onAuthStateChanged(user => {
                  user.updateEmail(data.email)
                  
                })
                
              }
            }
          ]
        });

        await alert.present();
    }
  }


