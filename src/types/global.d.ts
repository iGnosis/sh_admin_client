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

export enum BadgeMetric {
  patient_streak,
  patient_total_activity_duration,
  patient_total_activity_count,
  weekly_time_spent,
  monthly_time_spent,
  leaderboard_position,
}

export enum BadgeStatus {
  active,
  retired,
}

export enum BadgeTier {
  bronze,
  silver,
  gold,
  platinum,
}

export enum BadgeType {
  singleUnlock,
  unlimitedUnlock,
}

export interface Badge {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  dimension: string;
  metric?: BadgeMetric;
  minVal?: number;
  maxVal?: number;
  status: BadgeStatus;
  tier: BadgeTier;
  badgeType: BadgeType;
}
