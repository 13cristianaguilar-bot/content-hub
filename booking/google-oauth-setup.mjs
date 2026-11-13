// One-time desktop login. Prints a refresh token. Does not save it.
const clientId = process.env.GOOGLE_CLIENT_ID || "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
const redirect = "http://127.0.0.1:53682/callback";

if (!clientId || !clientSecret) {
  console.error("Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, then run this again.");
  process.exit(1);
}

const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
auth.searchParams.set("client_id", clientId);
auth.searchParams.set("redirect_uri", redirect);
auth.searchParams.set("response_type", "code");
auth.searchParams.set("access_type", "offline");
auth.searchParams.set("prompt", "consent");
auth.searchParams.set("scope", "https://www.googleapis.com/auth/calendar");

console.log("Open this URL and approve calendar access:\n");
console.log(auth.toString());
console.log("\nWaiting for the redirect on 127.0.0.1:53682 ...");

const { createServer } = await import("node:http");
const server = createServer(async (req, res) => {
  const url = new URL(req.url, redirect);
  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("Missing code");
    return;
  }
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirect,
      grant_type: "authorization_code",
    }),
  });
  const json = await tokenRes.json();
  res.writeHead(200, { "content-type": "text/plain" }).end("You can close this tab and return to the terminal.");
  server.close();
  if (!json.refresh_token) {
    console.error("Google did not return a refresh token. Revoke the app's access and run this again.");
    console.error(JSON.stringify({ error: json.error || "missing_refresh_token" }));
    process.exit(1);
  }
  console.log("\nRefresh token (save as GOOGLE_REFRESH_TOKEN, then clear this terminal):\n");
  console.log(json.refresh_token);
});

server.listen(53682, "127.0.0.1");
