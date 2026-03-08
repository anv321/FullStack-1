import { createClient } from "redis";

console.log("REDIS_URL:", process.env.REDIS_URL ? "SET" : "MISSING");

const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  socket: {
    tls: true,  // Upstash needs TLS
    rejectUnauthorized: false  // Self-signed certs
  }
});

client.on("error", (err) => {
  console.error("Redis Error:", err.code, err.message);
});

client.on("connect", () => {
  console.log("Redis connecting...");
});

client.on("ready", () => {
  console.log("Redis ready!");
});

await client.connect();
console.log("Redis client connected");

export default client;

