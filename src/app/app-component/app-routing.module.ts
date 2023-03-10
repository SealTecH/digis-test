import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { BalanceComponent } from '../pages/balance/balance.component';

const routes: Routes = [
   {
      path: '',
      component: DashboardComponent
   },
   {
      path: 'balance',
      component: BalanceComponent
   },
   {
      path: '**',
      redirectTo: ''
   }];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
