import { Chat } from '../chat/chat';
import { Message } from '../../model/Message';
import { Filter } from 'bad-words';

export class MessageChecker {
    constructor() {

    }

        checkMessage(chat:Chat): void {
        
        chat.onMessage = (event:any) => {
            try {
                const message: Message = JSON.parse(event.data);
                console.log('Parsed message:', message);
                if (!message) {
                    console.log('Message is null or undefined');
                    return;
                }
                if (!message.sender) {
                    console.log('Sender is null or undefined in message:', message);
                    return;
                }
                console.log('Sender object:', message.sender);
                if (!message.sender.username) {
                    console.log('Username is null or undefined in sender:', message.sender);
                    return;
                }
                //console.log('Username found:', message.sender.username);
            } catch (error) {
                console.error('Error processing message:', error);
                console.log('Event that caused error:', event);
            }
        };
    }
 }
