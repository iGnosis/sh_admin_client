import { Injectable } from '@angular/core';
import { GqlConstants } from '../../gql-constants';
import { GqlClientService } from '../gql-client/gql-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private client: GqlClientService) { }

  async resendLoginOtp(phoneCountryCode: string, phoneNumber: string): Promise<any> {
    return this.client.req(GqlConstants.RESEND_LOGIN_OTP, {
      phoneCountryCode,
      phoneNumber,
    }, false);
  }

  async requestLoginOtp(phoneCountryCode: string, phoneNumber: string): Promise<any> {
    return this.client.req(GqlConstants.REQUEST_LOGIN_OTP, {
      phoneCountryCode,
      phoneNumber,
    }, false);
  }

  async verifyLoginOtp(phoneCountryCode: string, phoneNumber: string, otp: number): Promise<any> {
    return this.client.req(GqlConstants.VERIFY_LOGIN_OTP, {
      phoneCountryCode,
      phoneNumber,
      otp,
    }, false);
  }

  async createOrganization(): Promise<any> {
    return this.client.req(GqlConstants.CREATE_ORGANIZATION);
  }

  async generateOrganizationInviteCode(organizationId: string): Promise<any> {
    return this.client.req(GqlConstants.GENERATE_ORGANIZATION_INVITE_CODE, { organizationId });
  }

  async updateInvitationCodeExpiry(inviteCode: string, expiryAt: string): Promise<any> {
    return this.client.req(GqlConstants.UPDATE_INVITATION_CODE_EXPIRY, {
      inviteCode,
      expiryAt,
    });
  }

  async sendOrganizationInvite(email: string, redirectUrl: string): Promise<any> {
    return this.client.req(GqlConstants.SEND_ORGANIZATION_INVITE, {
      email,
      redirectUrl,
    });
  }

  async getOrganizationsList(limit?: number, offset?: number): Promise<any> {
    return this.client.req(GqlConstants.GET_ORGANIZATIONS_LIST, {
      offset,
      limit,
    });
  }

  async getOrganizationDetails(id: string): Promise<any> {
    return this.client.req(GqlConstants.GET_ORGANIZATION_DETAILS, { id });
  }

  async saveOrganizationDetails(organization: {
    id: string;
    name: string;
    type: string;
  }): Promise<any> {
    return this.client.req(GqlConstants.UPDATE_ORGANIZATION_DETAILS, {
      ...organization,
    });
  }
}
