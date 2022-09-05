import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'register-attendance',
    loadChildren: () => import('./pages/register-attendance/register-attendance.module').then( m => m.RegisterAttendancePageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'assists',
    loadChildren: () => import('./pages/assists/assists.module').then( m => m.AssistsPageModule)
  },
  {
    path: 'manage-fingerprints',
    loadChildren: () => import('./pages/manage-fingerprints/manage-fingerprints.module').then( m => m.ManageFingerprintsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
