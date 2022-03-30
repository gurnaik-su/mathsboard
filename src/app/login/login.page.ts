import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public alertController: AlertController,
    private firestore: AngularFirestore
  ) {}
  
  ngOnInit() {}
  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {    

        firebase.auth().onAuthStateChanged(async user => {
          
    
          if(user.emailVerified == true){
            this.router.navigate(['home'])
           }
           else{
             console.log("email not verified")
             const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: "Email not verified",
              buttons: [
              {
                  text: 'Ok',
                }
              ]
            })
            await alert.present();
           }
        }
    
        
        )

        // if(this.authService.isEmailVerified) {
        //   this.router.navigate(['home']);          
        // }
      }).catch(async (error) => {
        console.log(error)
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: error.message,
          buttons: [
          {
              text: 'Ok',
            }
          ]
        })
        await alert.present();
      })
  }
  goToRegister(){
    this.router.navigate(['register']); 
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please Enter Your Email',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Email'
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
            this.authService.PasswordRecover(data.email);
          }
        }
      ]
    });

    await alert.present();
  }

}
