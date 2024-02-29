import { NextHandshake } from "handshake";
import { options } from "~/options";

export const dynamic = "force-dynamic";

export const { GET, POST } = NextHandshake(options);
