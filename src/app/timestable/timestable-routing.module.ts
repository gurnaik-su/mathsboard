import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimestablePage } from './timestable.page';

const routes: Routes = [
  {
    path: '',
    component: TimestablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimestablePageRoutingModule {}
