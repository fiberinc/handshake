import assert from "assert";
import { HandlerFactory } from "~/core/types";
import { makeOAuthFactory } from "./lib/oauth-factory";

// https://developers.hubspot.com/docs/api/scopes
type HubSpotScope =
  | "cms.domains.read"
  | "cms.domains.write"
  | "cms.functions.read"
  | "cms.functions.write"
  | "cms.knowledge_base.articles.read"
  | "cms.knowledge_base.articles.write"
  | "cms.knowledge_base.articles.publish"
  | "cms.knowledge_base.settings.read"
  | "cms.knowledge_base.settings.write"
  | "crm.lists.read"
  | "crm.lists.write"
  | "crm.objects.companies.read"
  | "crm.objects.companies.write"
  | "crm.objects.contacts.read"
  | "crm.objects.contacts.write"
  | "crm.objects.custom.read"
  | "crm.objects.custom.write"
  | "crm.objects.deals.read"
  | "crm.objects.deals.write"
  | "crm.objects.feedback_submission.read"
  | "crm.objects.goals.read"
  | "crm.objects.line_items.read"
  | "crm.objects.line_items.write"
  | "crm.objects.marketing_events.read"
  | "crm.objects.marketing_events.write"
  | "crm.objects.owners.read"
  | "crm.objects.quotes.read"
  | "crm.objects.quotes.write"
  | "crm.schemas.companies.read"
  | "crm.schemas.companies.write"
  | "crm.schemas.contacts.read"
  | "crm.schemas.contacts.write"
  | "crm.schemas.custom.read"
  | "crm.schemas.deals.read"
  | "crm.schemas.deals.write"
  | "crm.schemas.line_items.read"
  | "crm.schemas.quotes.read"
  | "settings.billing.write"
  | "settings.currencies.read"
  | "settings.currencies.write"
  | "settings.users.read"
  | "settings.users.write"
  | "settings.users.teams.read"
  | "settings.users.team.write"
  | "account-info.security.read"
  | "accounting"
  | "actions"
  | "analytics.behavioral_events.send"
  | "automation"
  | "behavioral_events.event_definitions.read_write"
  | "business_units.view.read"
  | "business-intelligence"
  | "collector.graphql_query.execute"
  | "collector.graphql_schema.read"
  | "communication_preferences.read"
  | "communication_preferences.read_write"
  | "communication_preferences.write"
  | "content"
  | "conversations.read"
  | "conversations.visitor_identification.tokens.create"
  | "conversations.write"
  | "crm.export"
  | "crm.import"
  | "ctas.read"
  | "e-commerce"
  | "external_integrations.forms.access"
  | "files"
  | "files.ui_hidden.read"
  | "forms"
  | "forms-uploaded-files"
  | "hubdb"
  | "integration-sync"
  | "marketing-email"
  | "media_bridge.read"
  | "media_bridge.write"
  | "oauth"
  | "sales-email-read"
  | "social"
  | "tickets"
  | "timeline"
  | "transactional-email";

interface Args {
  clientId: string;
  clientSecret: string;
  scopes: HubSpotScope[];
}

/**
 * Connect to your customers' [HubSpot](https://hubspot.com) accounts.
 *
 * @options
 * ```ts title="app/options.ts"
 * import { HubSpot } from "handshake";
 *
 * HubSpot({
 *   clientId: string,
 *   clientSecret: string,
 *   scopes: [
 *     "e-commerce",
 *     "crm.schemas.contacts.read" |
 *     "crm.objects.contacts.read" |
 *   ],
 * });
 * ```
 *
 * @providersetup
 *
 * ## Configure the Callback URL
 *
 * Make sure your Handshake URL is allowed within your HubSpot app's Auth tab:
 *
 * ![hubspot-redirect-settings](DOC_IMAGES/hubspot-redirect.png)
 *
 * Follow the format: `https://HANDSHAKE_URL/auth/hubspot/callback`
 *
 * @troubleshoot
 * ### "provided scopes are insufficient"
 *
 * You MUST pass ALL the scopes you configured for your to the `scopes` array.
 * Passing even a subset of the scopes will fail.
 */
export const HubSpot: HandlerFactory<Args> = (args) => {
  // assert(args.scopes, "scopes is empty or missing");
  assert(args.clientId, "clientId is empty or missing");
  assert(args.clientSecret, "clientSecret is empty or missing");

  // https://developers.hubspot.com/docs/api/oauth-quickstart-guide
  return makeOAuthFactory({
    id: "hubspot",
    name: "HubSpot",
    website: "https://hubspot.com",
    authorization: {
      url: "https://app.hubspot.com/oauth/authorize",
    },
    token: {
      url: "https://api.hubapi.com/oauth/v1/token",
    },
    checks: ["state"],
    client: {
      // HubSpot needs to see client_id in the body of the token call.
      token_endpoint_auth_method: "client_secret_post",
    },
  })(args);

  // const HubSpotConfig = {
  //   profileUrl: "https://api.hubapi.com/oauth/v1/access-tokens"
  // };
  // token: HubSpotConfig.tokenUrl,
  // userinfo: {
  //   url: HubSpotConfig.profileUrl,
  // },
};
