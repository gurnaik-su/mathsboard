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
      console.log(user)

      if(user){
        const result = this.firestore.doc(`/users/${user.uid}`);
        var userprofile = result.valueChanges();
        userprofile.subscribe( profile =>{
          console.log("PROFILE::", profile);
          profile['name'] = user.displayName
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
                  this.firestore.collection('users').doc(`/users/${user.uid}`).update({name:data.username});
                  

                })
                window.location.reload()

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
                  user.updateEmail(data.email).then(() => {
                    console.log("Successful")})
                    .catch(async (error) => {
                    console.log(`Unsuccessful returned error ${error}`)
                    const alert = await this.alertController.create({
                      cssClass: 'my-custom-class',
                      header: error.message,
                      buttons: [
                      {
                          text: 'Ok',
                        }
                      ]
                    })
                    alert.present();})
                  
                })
                
              }
            }
          ]
        });

        await alert.present();
    }

    redBadge(){
      firebase.auth().onAuthStateChanged(user => {
        user.updateProfile({
          photoURL: "/assets/images/redBadge.png"
        })
      })
      window.location.reload()
    }

    async blueBadge(){
      if(this.level >= 2){
      firebase.auth().onAuthStateChanged(user => {
        user.updateProfile({
          photoURL: "/assets/images/blueCircle.png"
        })
      })
      window.location.reload()
    }
    else{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Level Required : 2',
        buttons: [
        {
            text: 'Ok',
          }
        ]
      })
      alert.present();
    }
  }
  async lightGreenBadge(){
    if(this.level >= 4){
    firebase.auth().onAuthStateChanged(user => {
      user.updateProfile({
        photoURL: "/assets/images/green1Circle.png"
      })
    })
    window.location.reload()
  }else{
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Level Required : 4',
      buttons: [
      {
          text: 'Ok',
        }
      ]
    })
    alert.present();
  }
} 
  async orangeBadge(){
  if(this.level >= 6){
  firebase.auth().onAuthStateChanged(user => {
    user.updateProfile({
      photoURL: "/assets/images/orangeCircle.png"
    })
  })
  window.location.reload()
}
else{
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Level Required : 6',
    buttons: [
    {
        text: 'Ok',
      }
    ]
  })
  alert.present();
}
}
  async purpleBadge(){
  if(this.level >= 8){
  firebase.auth().onAuthStateChanged(user => {
    user.updateProfile({
      photoURL: "/assets/images/purpcirc.png"
    })
  })
  window.location.reload()
}
else{
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Level Required : 8',
    buttons: [
    {
        text: 'Ok',
      }
    ]
  })
  alert.present();
}
}
  async pinkBadge(){
  if(this.level >= 10){
  firebase.auth().onAuthStateChanged(user => {
    user.updateProfile({
      photoURL: "/assets/images/pinkCircle.png"
    })
  })
  window.location.reload()
}
else{
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Level Required : 10',
    buttons: [
    {
        text: 'Ok',
      }
    ]
  })
  alert.present();
}
}
  }


