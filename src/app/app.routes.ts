import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { IndexComponent } from './features/index/index.component';
import { features } from 'process';
import { FeaturesComponent } from './features/features.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { IncomesBillsComponent } from './features/dashboard/pages/incomes-bills/incomes-bills.component';

export const routes: Routes = [
  {
    path: 'index',
    component: FeaturesComponent,
    children: [
      { path: '', component: IndexComponent, data: { title: 'Dashboard' } },
    ],
  },
  {
    path: 'dashboard',
    component: FeaturesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
];
