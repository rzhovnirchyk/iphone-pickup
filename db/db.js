import path, { join } from "path";
import { Low } from "lowdb";
import { JSONFile } from 'lowdb/node'

const __dirname = path.resolve();
const file = join(__dirname, "./db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();

if (!db.data) {
  db.data = {
    urls: [],
  };
  await db.write();
}

async function getUrls() {
  await db.read();
  return db.data.urls;
}

export default db;
export { getUrls };
