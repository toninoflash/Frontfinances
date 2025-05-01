import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { IndexComponent } from './features/index/index.component';
import { features } from 'process';
import { FeaturesComponent } from './features/features.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ArtworkComponent } from './features/artwork/artwork/artwork.component';
import { GalleryComponent } from './features/artwork/gallery/gallery.component';
import { TableComponent } from './shared/components/table/table.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SeeComponent } from './features/artwork/see/see.component';
import { TableArtwaorkComponent } from './features/artwork/table-artwaork/table-artwaork.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'index',
    component: FeaturesComponent,
    children: [
      { path: '', component: IndexComponent, data: { title: 'Home' } },
    ],
  },
  {
    path: 'profile',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Perfil' },
    children: [
      {
        path: ':uid/arthist',
        component: ProfileComponent,
        data: { title: 'Artista' },
      },
      {
        path: 'artwork/:uid',
        component: ArtworkComponent,
        data: { title: 'Mis obras' },
        children: [
          { path: 'gallery/:id', component: GalleryComponent, data: { title: 'Galería' } },
          { path: 'table', component: TableArtwaorkComponent, data: { title: 'Gestión' } },
          { path: 'see/:id', component: SeeComponent, data: { title: 'Obra' } },
          { path: '', redirectTo: 'gallery', pathMatch: 'full' },
        ],
      }
    ],
  },
  {
    path: 'dashboard',
    component: FeaturesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dashboard' },
    children: [
      {
        path: ':uid/arthist',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
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
