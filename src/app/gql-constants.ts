export const GqlConstants = {
    GET_ORGANIZATIONS_LIST: `
    query Organizations($offset: Int = 0, $limit: Int = 10) {
        organization(limit: $limit, offset: $offset) {
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
    }
    `,
    RESEND_LOGIN_OTP: ``,
    REQUEST_LOGIN_OTP: ``,
    VERIFY_LOGIN_OTP: ``,
};