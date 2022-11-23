import { Injectable } from '@angular/core';
import { GraphQLClient } from 'graphql-request';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GqlClientService {
  private client: GraphQLClient;

  constructor() {
    const additionalHeaders = {
      'x-pointmotion-user-type': 'staff',
    };
    const token = localStorage.getItem('token');

    this.client = new GraphQLClient(environment.gqlEndpoint, {
      headers: Object.assign({
          Authorization: 'Bearer ' + token,
          ...additionalHeaders,
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
    const additionalHeaders = {
      'x-pointmotion-user-type': 'staff',
    };
    const token = jwt || localStorage.getItem('token');
    if (token) {
      this.client = new GraphQLClient(environment.gqlEndpoint, {
        headers: Object.assign({
          Authorization: 'Bearer ' + token,
          ...additionalHeaders,
        }),
      });
    }
  }

  /**
   * Used to make a query to the graphql server
   *
   * @param {string} request
   * @param {{ [key: string]: any } | undefined} variables?
   * @returns {Promise<any>}
   */
  async req(request: string, variables?: { [key: string]: any }): Promise<any> {
    return this.client.request(request, variables);
  }
}
