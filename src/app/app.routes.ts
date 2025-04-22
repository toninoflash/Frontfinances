import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { IndexComponent } from './features/index/index.component';
import { features } from 'process';
import { FeaturesComponent } from './features/features.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { IncomesBillsComponent } from './features/dashboard/pages/incomes-bills/incomes-bills.component';
import { FinancesComponent } from './features/dashboard/pages/finances/finances.component';
import { AccountComponent } from './features/account/account.component';
import { MyaccountsComponent } from './features/account/pages/myaccounts/myaccounts.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProductComponent } from './features/dashboard/pages/product/product.component';
import { CreditsAndMortagageComponent } from './features/credits-and-mortagage/credits-and-mortagage.component';
import { AllComponent } from './features/credits-and-mortagage/pages/all/all.component';
import { CreditComponent } from './features/credits-and-mortagage/pages/credit/credit.component';
import { RegisterComponent } from './features/auth/register/register.component';

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
    canActivate:[AuthGuard],
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
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
        children: [
          {
            path: 'product',
            component: ProductComponent,
            data: { title: 'Mis productos' },
          },
        ],
      },
    ],
  },
  {
    path: 'account',
    component: FeaturesComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'myac', // Redirige automáticamente a 'finances'
        pathMatch: 'full',
      },
      {
        path: '',
        component: AccountComponent,
        data: { title: 'Mis cuentas' },
        children: [
          {
            path: 'myac',
            component: MyaccountsComponent,
            data: { title: 'Mis cuentas' },
          },
          {
            path: 'myaccounts',
            component: MyaccountsComponent,
            data: { title: 'Mis cuentas' },
          },
        ],
      },

    ],
  },
  {
    path: 'craditall',
    component: FeaturesComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'all', // Redirige automáticamente a 'finances'
        pathMatch: 'full',
      },
      {
        path: '',
        component: CreditsAndMortagageComponent,
        data: { title: 'Mis cuentas' },
        children: [
          {
            path: 'all',
            component: AllComponent,
            data: { title: 'Mis préstamos e hipotecas' },
          },
          {
            path: 'myaccounts',
            component: MyaccountsComponent,
            data: { title: 'Mis cuentas' },
          },
          {
            path: 'get/:id',
            component: CreditComponent,
            data: { title: 'Crédito' },
          },
        ],
      },

    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
];
