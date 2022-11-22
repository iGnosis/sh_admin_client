import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { PublicGuard } from './guards/public-guard';
import { PrivateGuard } from './guards/private-guard';
import { LoginComponent } from './pages/login/login.component';
import { PrivateComponent } from './layouts/private/private.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  { path: '', redirectTo: 'public/login', pathMatch: 'full' },
  {
    path: 'public', canActivateChild: [PublicGuard], children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'app', component: PrivateComponent, canActivateChild: [PrivateGuard], children: [
      { path: 'organizations', component: OrganizationsComponent, },
    ],
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
