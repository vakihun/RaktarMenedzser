import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ThingsComponent } from './things/things.component';
import { WarehousesComponent } from './warehouses/warehouses.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/things', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent},
  { path: 'things', component: ThingsComponent, canActivate: [AuthGuard] },
  { path: 'warehouses', component: WarehousesComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/things'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
