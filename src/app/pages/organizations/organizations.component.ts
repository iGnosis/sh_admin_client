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
  linkExpiry = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    document.getElementById('nb-global-spinner').style.display = 'none';
    this.getOrganizationsList();
  }

  async getOrganizationsList() {
    const result = await this.apiService.getOrganizationsList();
    console.log('result: ', result);
  }

  toggleShowModal() {
    this.showOrganizationModal = !this.showOrganizationModal;
  }

}
