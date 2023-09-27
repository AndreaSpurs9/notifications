import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivedPage } from './received.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivedPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivedPageRoutingModule {}
