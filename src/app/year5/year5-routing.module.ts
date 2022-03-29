import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Year5Page } from './year5.page';

const routes: Routes = [
  {
    path: '',
    component: Year5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Year5PageRoutingModule {}
