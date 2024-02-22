import { NextHandshake } from "handshake";
import { options } from "~/app/options";

export const { GET, POST } = NextHandshake(options);
