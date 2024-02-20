import { NextLink } from "fiber-handshake";
import { config } from "~/config";

export const dynamic = "force-dynamic";

export const { GET, POST } = NextLink(config);
