import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { IonicModule } from '@ionic/angular';

import { Year3PageRoutingModule } from './year3-routing.module';

import { Year3Page } from './year3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Year3PageRoutingModule,
    SwiperModule
  ],
  declarations: [Year3Page]
})
export class Year3PageModule {}
