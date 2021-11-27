export interface Message {
  sender: string;
  reciever: string;
  content: string;
  timeStamp: string;
  seenAt?: string;
}

export interface UserContact {
  name: string;
  avatar: string;
  isOnline?: boolean;
}
