import { HeaderModule } from './../../componets/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistsPageRoutingModule } from './assists-routing.module';

import { AssistsPage } from './assists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    AssistsPageRoutingModule
  ],
  declarations: [AssistsPage]
})
export class AssistsPageModule {}
