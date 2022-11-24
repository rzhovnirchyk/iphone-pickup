import got from "got";
import userAgents from "top-user-agents";

const agents = userAgents.slice(0, 10);
const randomUserAgent = agents[Math.floor(Math.random() * agents.length) + 1];

async function getJson(url) {
  return new Promise(async (resolve, reject) => {
    if (!url) reject("No URL specified.");
    try {
      const response = await got(url, {
        headers: { "user-agent": randomUserAgent },
      }).json();
      resolve(response);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export { getJson };