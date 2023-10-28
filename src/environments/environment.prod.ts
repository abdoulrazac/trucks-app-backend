import { NgxLoggerLevel } from 'ngx-logger';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
  baseUrl : 'https://www.api.certification.adga-tech.com/v1',
  key :  "f165c16d01ec6fbbeb3a196e4f044f711a35ad2eaa48167fd94331cd2abdd3ec",
  iv : "d66442f28c59f26e0cb8b91192bcbea1"
};
