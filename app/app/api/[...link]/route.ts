import { NextLink } from "fiber-handshake";
import { config } from "~/config";

export const { GET, POST } = NextLink(config);
