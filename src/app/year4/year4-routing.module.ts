import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Year4Page } from './year4.page';

const routes: Routes = [
  {
    path: '',
    component: Year4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Year4PageRoutingModule {}
