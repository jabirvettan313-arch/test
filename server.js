require('dotenv').config();
const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

const token = process.env.TELEGRAM_BOT_TOKEN;

if (token) {
    const bot = new TelegramBot(token, {polling: true});

    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "Welcome! I am your institutional bot. How can I assist you today?");
    });

    bot.on('message', (msg) => {
        if(msg.text && !msg.text.startsWith('/start')) {
            bot.sendMessage(msg.chat.id, `You said: ${msg.text}\nI am currently in development.`);
        }
    });
    console.log("Telegram Bot started!");
} else {
    console.warn("No TELEGRAM_BOT_TOKEN found. Bot will not start.");
}

// Serve the static website files
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
