"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("./components/chat/chat");
const badWordService_1 = require("./components/badword/badWordService");
const chat = new chat_1.Chat();
const badWordService = new badWordService_1.BadWordService();
var list = require('badwords-list'), array = list.array, object = list.object, regex = list.regex;
//console.log(array);
// Test WebSocket server URL
const wsUrl = 'wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0&flash=false';
try {
    //     chat.onConnectionStatus = (status, error?) => {
    //         switch (status) {
    //             case 'connected':
    //                 console.log('✅ Connected to WebSocket server');
    //                 break;
    //             case 'disconnected':
    //                 console.log('🔴 Disconnected from WebSocket server');
    //                 break;
    //             case 'error':
    //                 console.error('❌ WebSocket error:', error);
    //                 break;
    //             case 'not_connected':
    //                 console.error('❌ WebSocket is not connected. Cannot send message.');
    //                 console.log('Current connection state:', error?.state);
    //                 break;
    //         }
    //     };
    //     // Connect to WebSocket server
    //     console.log(`Attempting to connect to ${wsUrl}...`);
    //     //chat.connect(wsUrl);
    //     // Test sending messages every 3 seconds
    //     setInterval(() => {
    //         const testMessage = `{"event":"pusher:subscribe","data":{"auth":"","channel":"chatrooms.25314085.v2"}}`;
    //         if (chat.sendMessage(testMessage)) {
    //             console.log('📤 Sent message:', testMessage);
    //         }
    //     }, 3000);
    //         // Set up message handlers
    //     chat.onMessage = (data) => {
    //         console.log('📩 Received message:', data);
    //     };
    badWordService.getBadWords('UserInputBadWords2').then((words) => {
        console.log(words);
    });
    badWordService.addBadWord('Test123', 'UserInputBadWords2').then((words) => {
        console.log(words);
    });
    badWordService.removeBadWord("Mahmut", "123", 'UserInputBadWords2').then((words) => {
        console.log(words);
    });
}
catch (error) {
    console.error('Error in test:', error);
}
//# sourceMappingURL=test.js.map