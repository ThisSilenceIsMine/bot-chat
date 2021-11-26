export interface Message {
  sender: string;
  reciever: string;
  content: string;
  timeStamp: string;
  seenAt?: string;
}
