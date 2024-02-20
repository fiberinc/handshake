import { NextHandshake } from "fiber-handshake";
import { config } from "~/config";

export const { GET, POST } = NextHandshake(config);
