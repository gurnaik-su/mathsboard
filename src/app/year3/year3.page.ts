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
  multiplyProgress: number;
  fractionProgress: number;
  year3NumberPoints: number;
  year3AdditionPoints: number;
  year3MultiplyPoints: number;
  year3FractionPoints: number;
  number11: string;number12: string;number13: string;number14: string;number15: string;number21: string;number22: string;number23: string;number24: string;number25: string;number41: string;number42: string;number43: string;number44: string;
  fraction11: string;fraction12: string;fraction21: string;fraction22: string;fraction23: string;fraction24: string;fraction25: string;fraction31: string;fraction32: string;fraction33: string;fraction34: string;fraction35: string;
  addition11: string; addition12: string; addition13: string; addition14: string; addition15: string; addition21: string; addition22: string; addition23: string; addition24: string; addition25: string; addition31: string; addition32: string; addition33: string; addition34: string; addition35: string;
  multiply11: string; multiply12: string; multiply13: string; multiply14: string; multiply15: string; multiply21: string; multiply22: string; multiply23: string; multiply24: string; multiply25: string; multiply31: string; multiply32: string; multiply33: string; multiply34: string;
  usersRef = collection(db, "users");
  @ViewChild(SwiperComponent) swiper: SwiperComponent;
  listItems: any;
  fractionlistItems: any;


  constructor(public authService: AuthenticationService, private firestore: AngularFirestore, public alertController: AlertController, public router: Router,) {
    this.listItems = [
      "346",
      "38",
      "834",
      "1000",
      "429"
    ];
    this.fractionlistItems = [
      "12/20",
      "15/20",
      "6/20",
      "19/20",
      "3/20"
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
          this.year3MultiplyPoints = profile['Year3-Multiply']
          this.multiplyProgress = profile['Year3-Multiply'] / 14
          this.year3FractionPoints = profile['Year3-Fraction']
          this.fractionProgress = profile['Year3-Fraction'] / 17
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
  onRenderlistItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    let draggedItem = this.listItems.splice(event.detail.from, 1)[0];
    this.listItems.splice(event.detail.to, 0, draggedItem)
    event.detail.complete();
  }
  onRenderfractionItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    let draggedItem = this.fractionlistItems.splice(event.detail.from, 1)[0];
    this.fractionlistItems.splice(event.detail.to, 0, draggedItem)
    event.detail.complete();
  }
  submitNumberAnswers(number11: string,number12: string,number13: string,number14: string,number15: string,number21: string,number22: string,number23: string,number24: string,number25: string,number41: string,number42: string,number43: string,number44: string) {

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

  submitAdditionAnswers(addition11: string, addition12: string, addition13: string, addition14: string, addition15: string, addition21: string, addition22: string, addition23: string, addition24: string, addition25: string, addition31: string, addition32: string, addition33: string, addition34: string, addition35: string) {

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
      if (this.year3AdditionPoints != null) {
        var tempPoints = this.profilePoints - this.year3AdditionPoints
      }
      else {
        var tempPoints = this.profilePoints
      }
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

  submitMultiplyAnswers(multiply11: string, multiply12: string, multiply13: string, multiply14: string, multiply15: string, multiply21: string, multiply22: string, multiply23: string, multiply24: string, multiply25: string, multiply31: string, multiply32: string, multiply33: string, multiply34: string) {

    var multiplyPoints = 0;
    if (multiply11 == "80") {
      multiplyPoints++
    }
    if (multiply12 == "12") {
      multiplyPoints++
    }
    if (multiply13 == "36") {
      multiplyPoints++
    }
    if (multiply14 == "64") {
      multiplyPoints++
    }
    if (multiply15 == "21") {
      multiplyPoints++
    }
    if (multiply21 == "150") {
      multiplyPoints++
    }
    if (multiply22 == "272") {
      multiplyPoints++
    }
    if (multiply23 == "96") {
      multiplyPoints++
    }
    if (multiply24 == "273") {
      multiplyPoints++
    }
    if (multiply25 == "468") {
      multiplyPoints++
    }
    if (multiply31 == "16r2") {
      multiplyPoints++
    }
    if (multiply32 == "4r2") {
      multiplyPoints++
    }
    if (multiply33 == "6") {
      multiplyPoints++
    }
    if (multiply34 == "5r4") {
      multiplyPoints++
    }
    console.log(this.profilePoints + multiplyPoints)
    firebase.auth().onAuthStateChanged(async user => {
      var userDoc = this.firestore.collection('users').doc(`${user.uid}`);
      if (this.year3MultiplyPoints != null) {
        var tempPoints = this.profilePoints - this.year3MultiplyPoints
      }
      else {
        var tempPoints = this.profilePoints
      }
      var newPoints = tempPoints + multiplyPoints;
      console.log(newPoints)
      userDoc.update({ 'Year3-Multiply': multiplyPoints })
      userDoc.update({ 'points': newPoints });
      popoverController.dismiss();
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "You scored " + multiplyPoints + "/14",
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

  submitFractionAnswers(fraction11: string, fraction12: string, fraction21: string, fraction22: string, fraction23: string, fraction24: string, fraction25: string, fraction31: string, fraction32: string, fraction33: string, fraction34: string, fraction35: string) {

    var fractionPoints = 0;
    if (fraction11 == "3/20") {
      fractionPoints++
    }
    if (fraction12 == "4/5") {
      fractionPoints++
    }
    if (fraction21 == "1/2") {
      fractionPoints++
    }
    if (fraction22 == "3/9") {
      fractionPoints++
    }
    if (fraction23 == "6/24") {
      fractionPoints++
    }
    if (fraction24 == "1/10") {
      fractionPoints++
    }
    if (fraction25 == "2/16") {
      fractionPoints++
    }
    if (fraction31 == "8/10") {
      fractionPoints++
    }
    if (fraction32 == "5/6") {
      fractionPoints++
    }
    if (fraction33 == "11/15") {
      fractionPoints++
    }
    if (fraction34 == "2/10") {
      fractionPoints++
    }
    if (fraction35 == "5/20") {
      fractionPoints++
    }
    if (this.fractionlistItems[0] == "3/20") {
      fractionPoints++
    }
    if (this.fractionlistItems[1] == "6/20") {
      fractionPoints++
    }
    if (this.fractionlistItems[2] == "12/20") {
      fractionPoints++
    }
    if (this.fractionlistItems[3] == "15/20") {
      fractionPoints++
    }
    if (this.fractionlistItems[4] == "19/20") {
      fractionPoints++
    }
    console.log(this.profilePoints + fractionPoints)
    firebase.auth().onAuthStateChanged(async user => {
      var userDoc = this.firestore.collection('users').doc(`${user.uid}`);
      if (this.year3FractionPoints != null) {
        var tempPoints = this.profilePoints - this.year3FractionPoints
      }
      else {
        var tempPoints = this.profilePoints
      }

      var newPoints = tempPoints + fractionPoints;
      console.log(newPoints)
      userDoc.update({ 'Year3-Fraction': fractionPoints })
      userDoc.update({ 'points': newPoints });
      popoverController.dismiss();
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: "You scored " + fractionPoints + "/17",
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
