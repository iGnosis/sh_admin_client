import { Component, OnInit } from '@angular/core';
import { GqlConstants } from '../../gql-constants';
import { GqlClientService } from '../../services/gql-client/gql-client.service';
import { Badge } from '../../../types/global';


@Component({
  selector: 'ngx-rewards',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {
  badges: Array<Badge>;
  showBadgeModal = false;

  constructor(private gqlClient: GqlClientService) { }

  ngOnInit(): void {
    this.fetchBadges();
  }

  async fetchBadges() {
    const req = await this.gqlClient.req(GqlConstants.GET_BADGES);
    this.badges = req.badge;
  }

  toggleShowModal() {
    this.showBadgeModal = !this.showBadgeModal;
    if (!this.showBadgeModal) {
      this.fetchBadges();
    }
  }
}
