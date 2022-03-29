import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Year3Page } from './year3.page';

const routes: Routes = [
  {
    path: '',
    component: Year3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Year3PageRoutingModule {}
