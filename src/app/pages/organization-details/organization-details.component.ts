import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'ngx-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {

  constructor(private breadCrumbService: BreadcrumbService, private route: ActivatedRoute) {
    this.breadCrumbService.set('/app/organization/:id', 'Arbor Acres');
  }

  ngOnInit(): void {
  }

}
