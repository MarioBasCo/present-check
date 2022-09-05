import { HeaderModule } from './../../componets/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAttendancePageRoutingModule } from './register-attendance-routing.module';

import { RegisterAttendancePage } from './register-attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    RegisterAttendancePageRoutingModule
  ],
  declarations: [RegisterAttendancePage],
  providers: [DatePipe]
})
export class RegisterAttendancePageModule {}
