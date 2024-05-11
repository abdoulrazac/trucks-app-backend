import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ROLE } from '../../shared/constants';

export class AuthTokenOutput {
  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;
}

export class UserAccessTokenClaims {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  numTel: string;

  @Expose()
  status: string;

  @Expose()
  avatar: string;

  @Expose()
  refDriver: string;

  @Expose()
  dateDriver: Date;

  @Expose()
  isAccountDisabled: boolean;

  @Expose()
  roles: ROLE[];
}

export class UserRefreshTokenClaims {
  id: number;
}
