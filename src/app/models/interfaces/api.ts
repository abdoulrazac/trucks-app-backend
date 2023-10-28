export interface IApiResponse<T> {
  data? : T;
  meta? : {
    count? : number
  };
  error? : {
    statusCode?: number,
    message?: string,
    errorName?: string,
    details?: {
      statusCode?: number,
      message?: string | string[],
      error: string
    }
  }
}