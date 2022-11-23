import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'ngx-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {
  organization = {
    id: '',
    name: '',
    type: '',
  };

  constructor(
    private breadCrumbService: BreadcrumbService, 
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.getOrganizationDetails().then(() => {
      this.breadCrumbService.set('/app/organization/:id', this.organization.name || '');
    });
  }

  async getOrganizationDetails() {
    const organizationId = this.route.snapshot.paramMap.get('id');
    const result = await this.apiService.getOrganizationDetails(organizationId);

    if (!result.organization_by_pk) return;


    this.organization = result.organization_by_pk;
  }

  ngOnInit(): void {
  }

}
