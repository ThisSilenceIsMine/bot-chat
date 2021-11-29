import { Bot } from './BotType';

export class IgnoreBot implements Bot {
  readonly name: string;

  constructor() {
    this.name = 'IgnoreBot';
  }
}
