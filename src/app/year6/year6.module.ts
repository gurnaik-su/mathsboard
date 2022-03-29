import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Year6PageRoutingModule } from './year6-routing.module';

import { Year6Page } from './year6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Year6PageRoutingModule
  ],
  declarations: [Year6Page]
})
export class Year6PageModule {}
