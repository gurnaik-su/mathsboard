import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Year5PageRoutingModule } from './year5-routing.module';

import { Year5Page } from './year5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Year5PageRoutingModule
  ],
  declarations: [Year5Page]
})
export class Year5PageModule {}
