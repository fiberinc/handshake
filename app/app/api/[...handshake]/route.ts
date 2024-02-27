import { NextHandshake } from "handshake";
import { options } from "~/options";

export const { GET, POST } = NextHandshake(options);
