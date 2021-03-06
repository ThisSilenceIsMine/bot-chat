import { useEffect, useState } from 'react';
import { Message, UserContact } from '@bot-chat/shared-types';
import { socket } from '../socket';
import { textSpanIsEmpty } from 'typescript';

export const useDialog = (contact: UserContact | undefined) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([]);
    if (contact) {
      socket.emit('loadHistory', contact.name);
      socket.emit('messagesRead', contact.name);
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
        socket.emit('messagesRead', message.sender);
      }
    });
    socket.on('messageViewed', (by, at) => {
      if (contact?.name === by) {
        setMessages((items) =>
          items.map((message) => {
            message.seenAt = message.seenAt ?? at;
            return message;
          })
        );
      }
    });
    return () => {
      socket.off('message');
      socket.off('messageHistory');
      socket.off('messageViewed');
    };
  }, [contact]);

  const sendMessage = (content: string) => {
    const username = localStorage.getItem('username');

    if (!username) {
      return;
    }
    if (!contact) return;

    const message: Message = {
      content,
      reciever: contact.name,
      sender: username,
      timeStamp: Date.now().toString(),
    };
    socket.emit('message', message);
    setMessages((items) => [...items, message]);
  };

  return { sendMessage, messages };
};
