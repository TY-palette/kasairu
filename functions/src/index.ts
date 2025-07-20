import {onRequest} from "firebase-functions/v2/https";
import {logger} from "firebase-functions";
import {sendLineMessage} from "./sendLineMessage"; // import だけはOK

export const lineWebhook = onRequest(async (req, res) => {
  const body = req.body;

  for (const event of body.events) {
    const userId = event.source.userId;
    const type = event.type;
    const messageText = event.message?.text;

    logger.info(`Webhook received from userId: ${userId}`);
    logger.info(`Type: ${type}, Text: ${messageText}`);

    if (type === "message" && messageText === "ping") {
      await sendLineMessage(userId, "pong!");
    }
  }

  res.status(200).send("OK");
});
