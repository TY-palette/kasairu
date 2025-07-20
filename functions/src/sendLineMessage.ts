import axios from "axios";
import {LINE_ACCESS_TOKEN} from "./config";

export const sendLineMessage = async (userId: string, message: string) => {
  try {
    await axios.post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: userId,
        messages: [{type: "text", text: message}],
      },
      {
        headers: {
          "Authorization": `Bearer ${LINE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Sent message to ${userId}`);
  } catch (error) {
    console.error(`Error sending message to ${userId}:`, error);
  }
};
