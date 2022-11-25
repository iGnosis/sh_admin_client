import { Injectable } from '@angular/core';
import { GraphQLClient } from 'graphql-request';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GqlClientService {
  private client: GraphQLClient;
  private additionalHeaders = {
    'x-pointmotion-user-type': 'staff',
    'x-organization-name': environment.organizationName,
  };

  constructor() {
    const token = localStorage.getItem('accessToken');

    this.client = new GraphQLClient(environment.gqlEndpoint, {
      headers: Object.assign({
          Authorization: 'Bearer ' + token,
          ...this.additionalHeaders,
        }),
      },
    );
  }

  /**
   * Recreate the client with the new jwt token
   *
   * @param {string} jwt?
   * @returns {void}
   */
  refreshClient(jwt?: string) {
    const token = jwt || localStorage.getItem('accessToken');
    if (token) {
      this.client = new GraphQLClient(environment.gqlEndpoint, {
        headers: Object.assign({
          Authorization: 'Bearer ' + token,
          ...this.additionalHeaders,
        }),
      });
    }
  }

  /**
   * Used to make a query to the graphql server
   *
   * @param {string} request
   * @param {{ [key: string]: any }} variables?
   * @param {boolean} auth?
   * @returns {Promise<any>}
   */
  async req(request: string, variables?: { [key: string]: any }, auth = true): Promise<any> {
    if (auth) return this.client.request(request, variables);
    else {
      const publicClient = new GraphQLClient(environment.gqlEndpoint, {
        headers: Object.assign({}, {
          'x-pointmotion-user-type': 'staff',
        }),
      });
      return publicClient.request(request, variables);
    }
  }
}
