import "dotenv/config";
import "log-timestamp";
import cron from "node-cron";

import db from "./db.js";
import { sendMessage } from "./telegram.js";

import { getJson } from "./getJson.js";

db.data.urls.map((url) => {
  runner(url);
  cron.schedule('*/5 * * * *', () => {
    const random = Math.floor(Math.random() * 2 * 60 * 1000); // random delay between 0 and 2 minutes
    setTimeout(() => {
      runner(s);
    }, random);
  });
});

async function runner(url) {
  console.log(`Running ${url}`);

  const result = await getJson(url);

  const available = result.body.content.pickupMessage.stores.filter(store => {
    return store.partsAvailability[Object.keys(store.partsAvailability)[0]].pickupDisplay !== 'unavailable';
  });

  available.map(store => {
    const details = store.partsAvailability[Object.keys(store.partsAvailability)[0]];
    const phone = details.messageTypes.regular.storePickupProductTitle;
    const status = details.messageTypes.regular.storePickupQuote;
    const message = `${phone}: ${status}`;
    sendMessage(message);
    console.log(message);
  })

  console.log(`Finished ${url}`);
}
