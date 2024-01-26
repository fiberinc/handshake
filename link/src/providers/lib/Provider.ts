import { NextApiRequest } from "next";

export type NextApiRequestWithQuery<P = any> = NextApiRequest & {
  query: P;
};

export interface Provider<
  CO = unknown,
  QP = NextApiRequest["query"], // Record<string, string | string[] | undefined>,
  CR = unknown,
> {
  id: string;
  type: string;
  metadata: {
    title: string;
    logo: string;
  };
  config: CO;
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
  ): Promise<URL | string> | URL;
  /**
   * @throws
   */
  parseQueryParams(req: NextApiRequest): QP & {
    expiresAt?: Date;
  };
  exchange(
    req: NextApiRequestWithQuery<QP>,
    callbackHandlerUrl: string,
  ): Promise<CR>;
}

export class InvalidRequest extends Error {
  toString() {
    return "InvalidRequest bro";
  }
}
