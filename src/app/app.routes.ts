import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { IndexComponent } from './features/index/index.component';
import { features } from 'process';
import { FeaturesComponent } from './features/features.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { IncomesBillsComponent } from './features/dashboard/pages/incomes-bills/incomes-bills.component';
import { FinancesComponent } from './features/dashboard/pages/finances/finances.component';

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
      {
        path: '',
        redirectTo: 'finances', // Redirige automáticamente a 'finances'
        pathMatch: 'full',
      },
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
        children: [
          {
            path: 'finances',
            component: FinancesComponent,
            data: { title: 'Mis finanzas' },
          },
          {
            path: 'incomes-bills',
            component: IncomesBillsComponent,
            data: { title: 'Ingresos y gastos' },
          },
        ],
      },

    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
];
