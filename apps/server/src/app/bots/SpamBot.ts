import { Bot } from './BotType';
import { Observable } from 'rxjs';
import { Chance } from 'chance';

const chance = new Chance();

export class SpamBot implements Bot {
  readonly name: string;

  constructor() {
    this.name = 'Spam Bot';
  }

  act(): Observable<string> {
    return new Observable((subscriber) => {
      (function loop() {
        const rand = Math.round(Math.random() * (120000 - 10000)) + 10000;
        setTimeout(() => {
          subscriber.next(chance.sentence());
          loop();
        }, rand);
      })();
    });
  }
}
