export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': string[];
    'x-hasura-default-role': string;
    'x-hasura-user-id': string;
    'x-hasura-organization-id'?: string;
  };
}
