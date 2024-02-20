// FIXME
export class OAuthCallbackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message += `${this.message ? " ." : ""}Read more at 1234`;
  }
}

// FIXME
export class InvalidCheck extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message += `${this.message ? ". " : ""}Read more at 1234`;
  }
}
