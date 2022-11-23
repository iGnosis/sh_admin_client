import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'ngx-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.scss']
})
export class EditOrganizationComponent implements OnInit {
  organization = {
    id: '',
    name: '',
    type: 'senior_home_facility',
  };
  allowSavingChanges = false;


  constructor(
    private breadCrumbService: BreadcrumbService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.getOrganizationDetails().then(() => {
      this.breadCrumbService.set('/app/organization/:id', this.organization.name || '');
      this.validateForm();
    });
  }

  ngOnInit(): void {
  }

  async getOrganizationDetails() {
    const organizationId = this.route.snapshot.paramMap.get('id');
    const result = await this.apiService.getOrganizationDetails(organizationId);

    if (!result.organization_by_pk) return;


    this.organization = result.organization_by_pk;
  }

  validateForm() {
    this.allowSavingChanges = this.organization.name !== '' && this.organization.type !== '';
  }

  async saveDetails() {
    await this.apiService.saveOrganizationDetails(this.organization);
    this.router.navigate(['app', 'organization', this.organization.id]);
  }

}
