export const GqlConstants = {
    REQUEST_LOGIN_OTP: `
    mutation RequestLoginOtp($phoneCountryCode: String!, $phoneNumber: String!, $inviteCode: String = "") {
      requestLoginOtp(phoneCountryCode: $phoneCountryCode, phoneNumber: $phoneNumber, inviteCode: $inviteCode) {
        data {
          message
        }
      }
    }`,
    RESEND_LOGIN_OTP: `
    mutation ResendLoginOtp($phoneCountryCode: String!, $phoneNumber: String!) {
      resendLoginOtp(phoneCountryCode: $phoneCountryCode, phoneNumber: $phoneNumber) {
        data {
          message
        }
      }
    }`,
    VERIFY_LOGIN_OTP: `
    mutation VerifyLoginOtp($phoneCountryCode: String!, $phoneNumber: String!, $otp: Int!) {
      verifyLoginOtp(phoneCountryCode: $phoneCountryCode, phoneNumber: $phoneNumber, otp: $otp) {
        data {
          token
        }
      }
    }`,
    CREATE_ORGANIZATION: `
    mutation CreateOrganization {
      insert_organization_one(object: {}) {
        orgId: id
      }
    }`,
    GENERATE_ORGANIZATION_INVITE_CODE: `
    mutation GenerateOrganizationInviteCode($organizationId: uuid!) {
      insert_invite_organization_one(object: {organizationId: $organizationId}) {
        inviteCode
      }
    }
    `,
    UPDATE_INVITATION_CODE_EXPIRY: `
    mutation UpdateInvitationCodeExpiry($expiryAt: timestamptz = "", $inviteCode: uuid = "") {
      update_invite_organization(where: {inviteCode: {_eq: $inviteCode}}, _set: {expiryAt: $expiryAt}) {
        affected_rows
      }
    }
    `,
    SEND_ORGANIZATION_INVITE: `
    mutation SendOrganizationInviteViaEmail($email: String!, $redirectUrl: String!, $inviteCode: String!) {
      inviteOrganizationViaEmail(email: $email, redirectUrl: $redirectUrl, inviteCode: $inviteCode) {
        data {
          message
        }
      }
    }`,
    GET_ORGANIZATIONS_LIST: `
    query Organizations($offset: Int = 0, $limit: Int = 10) {
        organization {
            id
            name
            patients_aggregate {
                aggregate {
                    count
                }
            }
            staffs_aggregate {
                aggregate {
                    count
                }
            }
        }
    }`,
    UPDATE_ORGANIZATION_DETAILS: `
    mutation UpdateOrganizationDetails($id: uuid!, $name: String!, $type: organization_type_enum = clinic) {
        update_organization_by_pk(pk_columns: {id: $id}, _set: {name: $name, type: $type}) {
          id
          name
          type
        }
    }`,
    GET_ORGANIZATION_DETAILS: `
    query GetOrganizationDetails($id: uuid!) {
        organization_by_pk(id: $id) {
            id
            name
            type
        }
    }`,
  GET_BADGES: `query GetBadges {
    badge {
      id
      createdAt
      updatedAt
      name
      description
      dimension
      metric
      minVal
      maxVal
      status
      tier
      badgeType
    }
  }`,
  INSERT_BADGE: `mutation InsertBadge($name: String!, $description: String!, $tier: badge_tier_enum!, $metric: String!, $minVal: Int = 0, $maxVal: Int = 0, $dimension: badge_dimension_enum!, $badgeType: badge_type_enum!) {
    insert_badge_one(object: {name: $name, description: $description, tier: $tier, metric: $metric, minVal: $minVal, maxVal: $maxVal, dimension: $dimension, status: active, badgeType: $badgeType}) {
      id
    }
  }`
};