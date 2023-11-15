let MAIL_HOST;
export default (): any => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
  project: {
    name: process.env.PROJECT_NAME,
    version: process.env.PROJECT_VERSION,
    description: process.env.PROJECT_DESCRIPTION,
    address: process.env.PROJECT_ADDRESS,
    url: process.env.PROJECT_URL,
    termsOfServiceUrl: process.env.PROJECT_TERMS_OF_SERVICE_URL,
    logo: process.env.PROJECT_LOGO,
    slogan: process.env.PROJECT_SLOGAN,
    color: process.env.PROJECT_COLOR,
    socialGithub: process.env.PROJECT_SOCIAL_GITHUB,
    socialFacebook: process.env.PROJECT_SOCIAL_FACEBOOK,
    socialTwitter: process.env.PROJECT_SOCIAL_TWITTER,
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
  jwt: {
    publicKey: Buffer.from(
      process.env.JWT_PUBLIC_KEY_BASE64,
      'base64',
    ).toString('utf8'),
    privateKey: Buffer.from(
      process.env.JWT_PRIVATE_KEY_BASE64,
      'base64',
    ).toString('utf8'),
    accessTokenExpiresInSec: parseInt(
      process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC,
      10,
    ),
    refreshTokenExpiresInSec: parseInt(
      process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC,
      10,
    ),
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    secure: process.env.MAIL_SECURE,
    credentialName: process.env.MAIL_CREDENTIAL_NAME,
    credentialEmail: process.env.MAIL_CREDENTIAL_EMAIL,
  },
  file: {
    uploadDestination: process.env.FILE_UPLOAD_DESTINATION,
    uploadDestinationAvatar: process.env.FILE_UPLOAD_DESTINATION_AVATAR,
    maxSize: parseInt(process.env.FILE_MAX_SIZE),
  },
  defaultAdminUserPassword: process.env.DEFAULT_ADMIN_USER_PASSWORD,
});
