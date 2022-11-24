import TelegramBot from "node-telegram-bot-api";
import db from "./db.js";

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  console.log("Start chat...", msg.chat.id);
  await db.read();
  const { chats } = db.data;
  chats.push(msg.chat.id);
  db.data.chats = [...new Set(chats)];
  db.write();
  bot.sendMessage(msg.chat.id, "Subscribed.");
});

bot.onText(/\/stop/, async (msg) => {
  console.log("Stop chat...", msg.chat.id);
  await db.read();
  const { chats } = db.data;
  const index = chats.indexOf(msg.chat.id);
  if (index > -1) {
    chats.splice(index, 1);
  }
  db.data.chats = chats;
  db.write();
  bot.sendMessage(msg.chat.id, "You will not receive the updates anymore.");
});

async function sendMessage(msg) {
  if (!msg) return;
  await db.read();
  if (db.data.chats) {
    db.data.chats.map((chatId) => bot.sendMessage(chatId, msg, { parse_mode: 'HTML' }));
  }
}

export { bot, sendMessage };
