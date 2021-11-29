import { Bot } from './BotType';

export class ReverseBot implements Bot {
  readonly name: string;

  constructor() {
    this.name = 'Reverse Bot';
  }

  async respond(message: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(message.split('').reverse().join(''));
      }, 3000);
    });
  }
}
