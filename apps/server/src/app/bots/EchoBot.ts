import { Bot } from './BotType';

export class EchoBot implements Bot {
  readonly name: string;

  constructor() {
    this.name = 'Echo Bot';
  }

  respond(message: string): string {
    return message;
  }
}
