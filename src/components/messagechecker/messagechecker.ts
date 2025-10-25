import { Chat } from '../chat/chat';
import { Message } from '../../model/Message';
import { Filter } from 'bad-words';
// MessageChecker bağlanan socket ile Chat örneğini bağlar.
export class MessageChecker {
    private filter: Filter;

    
    constructor() {
       this.filter = new Filter();
    }
    checkMessage2(chat:Chat): void {

            chat.onMessage = (data:any) => {
                let parsedData = JSON.parse(data);
                parsedData = JSON.parse(parsedData.data);
                let message:Message = parsedData as Message;
                console.log(message)
                console.log(message.sender)
                console.log(message.sender.username)
            }

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
                this.filter.isProfane(message.sender.username)
                    ? console.log(`⚠️ Profanity detected in username: ${message.sender.username}`)
                    : console.log(`✅ Clean username: ${message.sender.username}`);
            } catch (error) {
                console.error('Error processing message:', error);
                console.log('Event that caused error:', event);
            }
        };
    }
 }
