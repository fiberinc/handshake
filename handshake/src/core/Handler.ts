import { Provider } from "./Provider";
import { SessionValue } from "./session";

export type HandlerFactory<Args, Credential = unknown> = (
  args: Args & { id?: string },
) => Handler<Credential>;

export interface Handler<Credential = unknown> {
  id: string;
  provider: Provider;

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
  ): Promise<{ tokens: Credential }>;
}
