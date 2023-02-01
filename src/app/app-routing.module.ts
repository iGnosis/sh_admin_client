import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { PublicGuard } from './guards/public-guard';
import { PrivateGuard } from './guards/private-guard';
import { LoginComponent } from './pages/login/login.component';
import { PrivateComponent } from './layouts/private/private.component';
import { OrganizationDetailsComponent } from './pages/organization-details/organization-details.component';
import { EditOrganizationComponent } from './pages/edit-organization/edit-organization.component';

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
    path: 'app', component: PrivateComponent, canActivateChild: [PrivateGuard], 
    data: {
      breadcrumb: {
        label: 'Home',
        info: 'Home',
        routeInterceptor: ()=> {
          return '/app/organizations';
        }
      },
    },
    children: [
      { path: 'organizations', data: { breadcrumb: 'Organizations' }, component: OrganizationsComponent },
      { 
        path: 'organization', data: { breadcrumb: 'Organizations' },
        children: [
          { path: '', redirectTo: '/app/organizations', pathMatch: 'full' },
          { 
              path: ':id', children: [
                { path: '', component: OrganizationDetailsComponent, pathMatch: 'full' },
                { path: 'edit', component: EditOrganizationComponent, data: { breadcrumb: 'Edit Account Details' } },
            ] 
          },
        ] 
      },
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
