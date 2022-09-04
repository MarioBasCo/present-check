import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageFingerprintsPageRoutingModule } from './manage-fingerprints-routing.module';

import { ManageFingerprintsPage } from './manage-fingerprints.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageFingerprintsPageRoutingModule
  ],
  declarations: [ManageFingerprintsPage]
})
export class ManageFingerprintsPageModule {}
