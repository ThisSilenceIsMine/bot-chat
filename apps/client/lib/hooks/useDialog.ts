import { useEffect, useState } from 'react';
import { Message, UserContact } from '@bot-chat/shared-types';
import { socket } from '../socket';

export const useDialog = (contact: UserContact | undefined) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([]);
    if (contact) {
      socket.emit('loadHistory', contact.name);
    }
  }, [contact]);

  useEffect(() => {
    socket.on('messageHistory', (items) => {
      setMessages(items);
    });
    socket.on('message', (message) => {
      console.log(`new Message from: ${message.sender}`);
      if (message.sender === contact?.name) {
        setMessages((items) => [...items, message]);
      }
    });
    return () => {
      socket.off('message');
      socket.off('messageHistory');
    };
  }, [contact]);

  const sendMessage = (content: string) => {
    const username = localStorage.getItem('username');

    if (!username) {
      return;
    }
    if (contact) {
      socket.emit('message', {
        content,
        reciever: contact.name,
        sender: username,
        timeStamp: Date.now().toString(),
      });
    }
  };

  return { sendMessage, messages };
};
