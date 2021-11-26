import { Message } from './types';

export interface ServerToClientEvents {
  message: (message: Message) => void;
  userData: (name: string, avatar: string) => void;
  messageHistory: (history: Message[]) => void;
}

export interface ClientToServerEvents {
  message: (message: Message) => void;
  messagesViewed: (contact: string) => void;
}
