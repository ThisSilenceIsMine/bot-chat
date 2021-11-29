import { Observable } from 'rxjs';

interface BotBase {
  name: string;
  /**
   * Perform action in response to user's message
   */
  respond?: (message: string) => string | Promise<string>;
  /**
   * Perform action independent to user's actions
   */
  act?: () => Observable<string>;
}

// interface ActBot extends BotBase {
//   act: () => string;
// }

// interface ResponseBot extends BotBase {
//   respond: () => string;
// }

// export type Bot = ActBot | ResponseBot | (ActBot & ResponseBot);

export type Bot = BotBase;
