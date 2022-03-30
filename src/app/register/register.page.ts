import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

   auth = getAuth();

  usersRef = collection(db,"users");

  

  constructor(public authService: AuthenticationService, public router: Router, private firestore: AngularFirestore,public alertController: AlertController) { }

  ngOnInit() {
  }

  

  
  
  async signUp(email, password, passwordtwo, username){
    console.log("password =" + password.value)
    console.log("password =" + passwordtwo.value)
    if(password.value == passwordtwo.value){
    
      
    
    this.authService.RegisterUser(email.value, password.value)      
    .then(   (res) => {
      res.user.updateProfile({
        displayName: username.value,
        photoURL: "/assets/images/redBadge.png"
      })
      this.authService.SendVerificationMail()
      console.log(res.user)
      console.log("b4 set")

      
       setDoc(doc(this.usersRef,res.user.uid), {
        name: username.value ,
        points: 0
      }).then(() => {
        console.log("Successful")})
        .catch((error) => {
        console.log(`Unsuccessful returned error ${error}`)});
      

      console.log("after set")

      this.router.navigate(['verify-email']);
      
       
    }).catch(async (error) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: error.message,
        buttons: [
        {
            text: 'Ok',
          }
        ]
      })
      alert.present();
    })
}else{
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Passwords dont match!',
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
