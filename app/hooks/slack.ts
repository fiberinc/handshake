export async function postToSlack(
  message: string,
  channelId: string,
  bearer: string,
) {
  if (process.env.NODE_ENV !== "production") {
    console.log("Not posting to slack in dev mode", message);
    return;
  }

  const body = {
    channel: channelId,
    text: message,
  };

  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.warn("Failed to post to Slack", await res.json(), body);
  }
}
