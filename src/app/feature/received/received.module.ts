import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReceivedPage } from './received.page';

import { ReceivedPageRoutingModule } from './received-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivedPageRoutingModule
  ],
  declarations: [ReceivedPage]
})
export class ReceivedPageModule {}
