# iPhone Pickup Availability

A Node.js app that periodically checks apple.com for product pickup availability and sends a notification via a Telegram bot.

## Products

Wanted products and closest postal code are specified in the URLs in [db.json.example](db/db.json.example).

## Telegram

Make sure to create a Telegram bot and add the token to the `.env` file. Then start the app and `/start` the Telegram bot to subscribe to the updates.

## Running

The app is running in a Docker container that can be started and stopped with the `start.sh` and `stop.sh` scripts.

```
npm install
./start.sh
```
