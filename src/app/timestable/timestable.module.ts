import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimestablePageRoutingModule } from './timestable-routing.module';

import { TimestablePage } from './timestable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimestablePageRoutingModule
  ],
  declarations: [TimestablePage]
})
export class TimestablePageModule {}
