import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Year4PageRoutingModule } from './year4-routing.module';

import { Year4Page } from './year4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Year4PageRoutingModule
  ],
  declarations: [Year4Page]
})
export class Year4PageModule {}
