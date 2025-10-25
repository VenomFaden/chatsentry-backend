"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageChecker = void 0;
const chat_1 = require("../chat/chat");
// MessageChecker bağlanan socket ile Chat örneğini bağlar.
class MessageChecker {
    constructor() {
        this.chat = new chat_1.Chat();
    }
    checkMessage() {
        this.chat.onMessage = (data) => {
            console.log('📩 Received message:', data);
        };
    }
}
exports.MessageChecker = MessageChecker;
//# sourceMappingURL=messagechecker.js.map