import { Injectable } from '@angular/core';
import { GqlConstants } from '../../gql-constants';
import { GqlClientService } from '../gql-client/gql-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private client: GqlClientService) { }

  async getOrganizationsList(limit?: number, offset?: number): Promise<any> {
    this.client.refreshClient();
    return this.client.req(GqlConstants.GET_ORGANIZATIONS_LIST, {
      offset,
      limit,
    });
  }
}
