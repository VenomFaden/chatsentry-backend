"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const chat_1 = require("./components/chat/chat");
const messagechecker_1 = require("./components/messagechecker/messagechecker");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
//wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0&flash=false
//{"event":"pusher:subscribe","data":{"auth":"","channel":"chatrooms.24833578.v2"}}
// Serve the static frontend
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
io.on('connection', (socket) => {
    console.log('Frontend connected:', socket.id);
    // 1. Her bağlanan socket için YENİ, ÖZEL bir chat objesi oluştur
    const chat = new chat_1.Chat();
    const messageChecker = new messagechecker_1.MessageChecker();
    // 2. Bu öze chat objesinin olaylarını SADECE bu socket'e yönlendir
    chat.onMessage = (data) => {
        // io.emit yerine socket.emit kullanarak SADECE bu istemciye gönder
        //socket.emit('message', data); // <-- DEĞİŞİKLİK
        messageChecker.checkMessage(chat);
        //console.log(`Socket ${socket.id} için mesaj iletildi:`, data);
    };
    chat.onConnectionStatus = (status, error) => {
        // io.emit yerine socket.emit kullanarak SADECE bu istemciye gönder
        socket.emit('status', { status, error }); // <-- DEĞİSİKLİK
        console.log(`Socket ${socket.id} için bağlantı durumu:`, status, error || '');
    };
    // 3. İstemcinin "send" olayı bu öze chat objesini kullanır
    socket.on('send', (msg) => {
        const payload = typeof msg === 'string' ? msg : JSON.stringify(msg);
        // Bu socket'in kendi chat objesine mesaj gönderir
        const ok = chat.sendMessage(payload);
        socket.emit('send_status', { ok });
    });
    // 4. İstemci hangi URL'e bağlanacağını söylediğinde bu özel chat'i bağla
    socket.on('set_ws_url', (url) => {
        try {
            // Bu socket'in kendi chat objesini istemcinin verdiği URL'e bağla
            chat.connect(url);
            socket.emit('set_ws_url', { ok: true });
        }
        catch (e) {
            socket.emit('set_ws_url', { ok: false, error: String(e) });
        }
    });
    // 5. İstemcinin bağlantısı koptuğunda, bu öze chat objesini de kapat
    socket.on('disconnect', () => {
        console.log('Frontend disconnected:', socket.id);
        chat.close();
        // !! ÇOK ÖNEMLİ: Kaynak sızıntısını önlemek için bu chat'in bağlantısını kes
        // Not: .disconnect() metodunun adının bu olduğunu varsayıyorum.
        // Sizin Chat sınıfınızda bu metodun adı farklıysa (örn: .close()) onu kullanın.
    });
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
// Root endpoint
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
const PORT = process.env.PORT || 3000;
try {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
catch (error) {
    console.error('Server başlatılırken hata oluştu:', error);
    process.exit(1);
}
// Yakalanmayan hataları da logla
process.on('uncaughtException', (error) => {
    console.error('Yakalanmayan hata:', error);
});
process.on('unhandledRejection', (error) => {
    console.error('İşlenmeyen Promise hatası:', error);
});
//# sourceMappingURL=server.js.map