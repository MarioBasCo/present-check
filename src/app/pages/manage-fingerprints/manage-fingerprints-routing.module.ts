import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageFingerprintsPage } from './manage-fingerprints.page';

const routes: Routes = [
  {
    path: '',
    component: ManageFingerprintsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageFingerprintsPageRoutingModule {}
