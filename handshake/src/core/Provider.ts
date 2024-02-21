import { SessionValue } from "./session";

export interface Provider<Config = unknown, CR = unknown> {
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
   * Exchange the data received
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
