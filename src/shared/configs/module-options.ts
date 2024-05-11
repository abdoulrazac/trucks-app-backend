import * as Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import configuration from './configuration';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  load: [configuration],
  validationSchema: Joi.object({
    // Application
    APP_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    APP_PORT: Joi.number().required(),

    // Setting
    SETTING_MAIL_VERIFICATION_DURATION: Joi.number().required(),
    SETTING_PASSWORD_RESET_DURATION: Joi.number().required(),

    // Database
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().optional(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),

    // JWT
    JWT_PUBLIC_KEY_BASE64: Joi.string().required(),
    JWT_PRIVATE_KEY_BASE64: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXP_IN_SEC: Joi.number().required(),
    JWT_REFRESH_TOKEN_EXP_IN_SEC: Joi.number().required(),

    // Mail
    MAIL_HOST : Joi.string().required(),
    MAIL_PORT : Joi.number().required(),
    MAIL_USER : Joi.string().required(),
    MAIL_PASSWORD : Joi.string().required(),
    MAIL_CREDENTIAL_NAME : Joi.string().required(),
    MAIL_CREDENTIAL_EMAIL : Joi.string().required(),

    // File
    FILE_UPLOAD_DESTINATION : Joi.string().required(),
    FILE_MAX_SIZE : Joi.number().required(),

    // Default Admin User
    DEFAULT_ADMIN_USER_PASSWORD: Joi.string().required(),
  }),
};
