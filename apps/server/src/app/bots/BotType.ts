interface BotBase {
  name: string;
  /**
   * Perform action in response to user's message
   */
  respond?: (message: string) => string | Promise<string>;
  /**
   * Perform action independent to user's actions
   */
  // act?: () => Observable<string>;
  act?: (cb: (message: string) => void) => void;
}

export type Bot = BotBase;
