import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  production: false,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  baseUrl: "http://localhost:3000/api/v1",
  key: "f165c16d01ec6fbbeb3a196e4f044f711a35ad2eaa48167fd94331cd2abdd3ec",
  iv: "d66442f28c59f26e0cb8b91192bcbea1",
  recaptcha: {
    siteKey: "6LeAkN8nAAAAADQAb8Hqg9zi6YDHBpQM_hM19nrI",
  },
};
