import { HandlerFactory } from "~/core/types";
import { TypicalOAuthArgs, makeOAuthFactory } from "./lib/oauth-factory";

// https://developer.xero.com/documentation/guides/oauth2/scopes/
export type XeroScope =
  | "offline_access"
  | "accounting.transactions"
  | "accounting.transactions.read"
  | "accounting.reports.read"
  | "accounting.reports.tenninetynine.read"
  | "accounting.journals.read"
  | "accounting.settings"
  | "accounting.settings.read"
  | "accounting.contacts"
  | "accounting.contacts.read"
  | "accounting.attachments"
  | "accounting.attachments.read"
  | "accounting.budgets.read"
  | "payroll.employees"
  | "payroll.employees.read"
  | "payroll.payruns"
  | "payroll.payruns.read"
  | "payroll.payslip"
  | "payroll.payslip.read"
  | "payroll.timesheets"
  | "payroll.timesheets.read"
  | "payroll.settings"
  | "payroll.settings.read"
  | "files"
  | "files.read"
  | "assets"
  | "assets.read"
  | "projects"
  | "projects.read"
  | "paymentservices"
  | "bankfeeds"
  | "bankfeeds.read"
  | "finance.accountingactivity.read"
  | "finance.cashvalidation.read"
  | "finance.statements.read"
  | "finance.bankstatementsplus.read"
  | "einvoicing"
  | "app.connections"
  | "marketplace.billing";

interface Args {
  clientId: string;
  clientSecret: string;
  scopes?: XeroScope[];
}

export type XeroCredential = {
  access_token: string;
  refresh_token?: string;
  id_token: string;
  scope: string;
};

/**
 * ## Usage
 *
 * Provide the following arguments:
 *
 * ```ts title="app/options.ts"
 *
 * import { Xero } from "handshake";
 *
 * Xero({
 *   clientId: process.env.XERO_CLIENT_ID,
 *   clientSecret: process.env.XERO_CLIENT_SECRET,
 *   scopes: ["offline_access", "accounting.transactions"],
 * });
 * ```
 *
 * The `offline_access` scope is required to get a `refresh_token` in your
 * response.
 *
 * ### Allow your Handshake callback URL
 *
 * In your Xero app settings.
 *
 * You can set up a localhost callback by toggling the "View test data" switch.
 *
 * ![xero-callback-settings](DOC_IMAGES/xero-redirect.png)
 *
 * ### Troubleshooting
 *
 * You may see an "Error: invalid_scope : Invalid scope" error if the only
 * scope you provide is `offline_access`.
 */
export const Xero: HandlerFactory<Args, Credential> = makeOAuthFactory<
  TypicalOAuthArgs,
  Credential
>({
  id: "xero",
  name: "Xero",
  website: "https://xero.com",
  wellKnown: "https://identity.xero.com/.well-known/openid-configuration",
  idToken: true,
  checks: ["pkce", "state"],
});
