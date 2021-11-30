import { Bot } from './BotType';
import { Chance } from 'chance';

const chance = new Chance();

export class SpamBot implements Bot {
  readonly name: string;

  constructor() {
    this.name = 'Spam Bot';
  }

  act(cb: (message: string) => void) {
    (function loop() {
      const rand = Math.round(Math.random() * (120000 - 10000)) + 10000;
      setTimeout(() => {
        cb(chance.sentence());
        loop();
      }, rand);
    })();
  }
}
