import { UserContact } from '..';
import { Message } from './types';

export interface ServerToClientEvents {
  message: (message: Message) => void;
  userData: (name: string, avatar: string) => void;
  messageHistory: (history: Message[]) => void;
  messageViewed: (by: string, at: string) => void;
  contacts: (list: UserContact[]) => void;
}

export interface ClientToServerEvents {
  message: (message: Message) => void;
  loadHistory: (contact: string) => void;
  messagesRead: (from: string) => void;
}
