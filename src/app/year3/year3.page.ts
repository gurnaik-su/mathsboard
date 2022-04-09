import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { AuthenticationService } from "../shared/authentication-service";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { db } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import { popoverController } from '@ionic/core';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-year3',
  templateUrl: './year3.page.html',
  styleUrls: ['./year3.page.scss'],
})
export class Year3Page implements OnInit {
  photo: string;
  name: string;
  email: string;
  profilePoints: number;
  numberProgress: number;
  additionProgress: number;
  year3NumberPoints: number;
  year3AdditionPoints:number;
  usersRef = collection(db, "users");
  @ViewChild(SwiperComponent) swiper: SwiperComponent;
  listItems: any;


  constructor(public authService: AuthenticationService, private firestore: AngularFirestore, public alertController: AlertController, public router: Router,) {
    this.listItems = [
      "346",
      "38",
      "834",
      "1000",
      "429"
    ];

  }

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
          this.profilePoints = profile['points']
          this.year3NumberPoints = profile['Year3-Number']
          this.numberProgress = profile['Year3-Number'] / 20
          this.year3AdditionPoints = profile['Year3-Addition']
          this.additionProgress = profile['Year3-Addition'] / 15
        })
      }
    }
    )
  }
  nextSlide() {
    this.swiper.swiperRef.slideNext();
  }
  prevSlide() {
    this.swiper.swiperRef.slidePrev();
  }
  onRenderItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    let draggedItem = this.listItems.splice(event.detail.from, 1)[0];
    this.listItems.splice(event.detail.to, 0, draggedItem)
    event.detail.complete();
  }
  submitNumberAnswers(number11, number12, number13, number14, number15, number21, number22, number23, number24, number25, number41, number42, number43, number44) {

    var numberPoints = 0;
    if (number11 == "8") {
      numberPoints++
      console.log("number11 correct")
    }
    if (number12 == "72") {
      numberPoints++
      console.log("number12 correct")
    }
    if (number13 == "88") {
      numberPoints++
      console.log("number13 correct")
    }
    if (number14 == "120") {
      numberPoints++
      console.log("number14 correct")
    }
    if (number15 == "96") {
      numberPoints++
    }
    if (number21 == "70") {
      numberPoints++
    }
    if (number22 == "200") {
      numberPoints++
    }
    if (number23 == "8") {
      numberPoints++
    }
    if (number24 == "20") {
      numberPoints++
    }
    if (number25 == "70") {
      numberPoints++
    }
    if (this.listItems[0] == "38") {
      numberPoints++
    }
    if (this.listItems[1] == "346") {
      numberPoints++
    }
    if (this.listItems[2] == "429") {
      numberPoints++
    }
    if (this.listItems[3] == "834") {
      numberPoints++
    }
    if (this.listItems[4] == "1000") {
      numberPoints++
      numberPoints++
    }
    if (number41 == "three hundred and eighty-four") {
      numberPoints++
    }
    if (number42 == "thirty-nine") {
      numberPoints++
    }
    if (number43 == "five hundred and eighty-three") {
      numberPoints++
    }
    if (number44 == "two hundred and ninety-four") {
      numberPoints++
    }
    console.log(this.profilePoints + numberPoints)
    firebase.auth().onAuthStateChanged(async user => {
      var userDoc = this.firestore.collection('users').doc(`${user.uid}`);
      var tempPoints = this.profilePoints - this.year3NumberPoints
      var newPoints = tempPoints + numberPoints;
      console.log(newPoints)
      userDoc.update({ 'Year3-Number': numberPoints })
      userDoc.update({ 'points': newPoints });
      popoverController.dismiss();
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "You scored " + numberPoints + "/20",
        buttons: [
          {
            text: 'Ok',
          }
        ]
      })
      await alert.present();
    }
    )
  }

  submitAdditionAnswers(addition11, addition12, addition13, addition14, addition15, addition21, addition22, addition23, addition24, addition25, addition31, addition32, addition33, addition34, addition35) {

    var additionPoints = 0;
    if (addition11 == "129") {
      additionPoints++
    }
    if (addition12 == "621") {
      additionPoints++
    }
    if (addition13 == "418") {
      additionPoints++
    }
    if (addition14 == "881") {
      additionPoints++
    }
    if (addition15 == "698") {
      additionPoints++
    }
    if (addition21 == "41") {
      additionPoints++
    }
    if (addition22 == "237") {
      additionPoints++
    }
    if (addition23 == "240") {
      additionPoints++
    }
    if (addition24 == "83") {
      additionPoints++
    }
    if (addition25 == "404") {
      additionPoints++
    }
    if (addition31 == "TRUE") {
      additionPoints++
    }
    if (addition32 == "FALSE") {
      additionPoints++
    }
    if (addition33 == "FALSE") {
      additionPoints++
    }
    if (addition34 == "TRUE") {
      additionPoints++
    }
    if (addition35 == "TRUE") {
      additionPoints++
    }
    console.log(this.profilePoints + additionPoints)
    firebase.auth().onAuthStateChanged(async user => {
      var userDoc = this.firestore.collection('users').doc(`${user.uid}`);
      var tempPoints = this.profilePoints - this.year3AdditionPoints
      var newPoints = tempPoints + additionPoints;
      console.log(newPoints)
      userDoc.update({ 'Year3-Addition': additionPoints })
      userDoc.update({ 'points': newPoints });
      popoverController.dismiss();
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "You scored " + additionPoints + "/15",
        buttons: [
          {
            text: 'Ok',
          }
        ]
      })
      await alert.present();
    }
    )
  }

}
