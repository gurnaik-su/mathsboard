import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Year6Page } from './year6.page';

const routes: Routes = [
  {
    path: '',
    component: Year6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Year6PageRoutingModule {}
