import { NextRequest } from "next/server";
import { SessionValue } from "./session";

export type RequestWithParams<P = any> = NextRequest & {
  // query: P;
};

export interface Provider<
  Config = unknown,
  QueryParams = unknown,
  CR = unknown,
> {
  id: string;
  type: string;
  metadata: {
    title: string;
    logo?: string;
  };
  config: Config;
  /**
   *
   * @param callbackHandlerUrl
   * @param extras - object with the `extras` option passed by the frontend.
   * Used for passing data like `myShopifyDomain`.
   *
   * @throws HttpError for expected errors.
   */
  getAuthorizationUrl(
    callbackHandlerUrl: string,
    extras?: any | undefined,
  ):
    | Promise<{ url: string; persist?: Record<string, string> }>
    | { url: string; persist?: Record<string, string> };
  /**
   * Allows the provider to check that the query params returned by the provider
   * match the expected shape.
   *
   * @throws
   */
  validateQueryParams?(
    params: URLSearchParams,
    req: Request,
  ): QueryParams & {
    expiresAt?: Date;
  };
  /**
   *
   * @param req - With search params = QP
   * @param thisCallbackUrl
   */
  exchange(
    params: URLSearchParams,
    req: Request,
    thisCallbackUrl: string,
    session: SessionValue,
  ): Promise<CR>;
}

export class InvalidRequest extends Error {
  toString() {
    return "InvalidRequest bro";
  }
}
