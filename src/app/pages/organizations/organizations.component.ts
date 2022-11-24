import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'ngx-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
})
export class OrganizationsComponent implements OnInit {
  isShowFilter = false;
  showOrganizationModal = false;
  organizations = [];
  filteredOrganizations = [];
  searchQuery: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    document.getElementById('nb-global-spinner').style.display = 'none';
    this.getOrganizationsList();
  }

  async getOrganizationsList() {
    const result = await this.apiService.getOrganizationsList();
    if (!result.organization) return;

    this.organizations = result.organization;
    this.filteredOrganizations = this.organizations;
  }

  toggleShowModal() {
    this.showOrganizationModal = !this.showOrganizationModal;
  }

  searchOrganization() {
    this.filteredOrganizations = this.organizations.filter((organization) => organization.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

}
