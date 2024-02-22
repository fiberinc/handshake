const REPO_URL = "https://github.com/fiberinc/handshake";

// FIXME
export class OAuthCallbackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message += `${this.message ? ". " : ""}Read more at ${REPO_URL}`;
  }
}

// FIXME
export class InvalidCheck extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message += `${this.message ? ". " : ""}Read more at ${REPO_URL}`;
  }
}

export class InvalidRequest extends Error {
  toString() {
    return "InvalidRequest bro";
  }
}
