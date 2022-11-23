import { NgModule } from '@angular/core';
import { NbIconModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { OrganizationsComponent } from './organizations/organizations.component';
import { LoginComponent } from './login/login.component';
import { AddOrganizationModalComponent } from '../components/add-organization-modal/add-organization-modal.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { EditOrganizationComponent } from './edit-organization/edit-organization.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    BreadcrumbModule,
    NbEvaIconsModule,
    NbIconModule,
    FormsModule
  ],
  declarations: [
    PagesComponent,
    OrganizationsComponent,
    LoginComponent,
    AddOrganizationModalComponent,
    OrganizationDetailsComponent,
    EditOrganizationComponent,
  ],
})
export class PagesModule {
}
