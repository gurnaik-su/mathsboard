import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timestable',
  templateUrl: './timestable.page.html',
  styleUrls: ['./timestable.page.scss'],
})
export class TimestablePage implements OnInit {

  ans: number;
  hide: number = 0;
  firstDigit: number;
  secondDigit: number;

  constructor() { }

  ngOnInit() {
  }

  calculate(firstDigit: any,secondDigit: any){
    this.ans = firstDigit * secondDigit
  }
  hideMethod(){
    this.hide++
  }
}
