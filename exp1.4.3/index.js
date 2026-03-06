import express from "express";
import client from "./redisClient.js";
import {
  initSeats,
  getSeats,
  lockSeat,
  bookSeat,
  releaseSeat,
} from "./ticketService.js";

const app = express();
app.use(express.json());

// ensure Redis connected and seats initialized
await client.ping();
await initSeats();

app.get("/", (req, res) => {
  res.json({ message: "Ticket booking system with Redis locks" });
});

// view all seats
app.get("/seats", async (req, res) => {
  const seats = await getSeats();
  res.json(seats);
});

// lock a seat
app.post("/seats/:id/lock", async (req, res) => {
  const seatId = req.params.id;
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "userId required" });

  const result = await lockSeat(seatId, userId);
  res.status(result.success ? 200 : 409).json(result);
});

// book a seat
app.post("/seats/:id/book", async (req, res) => {
  const seatId = req.params.id;
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "userId required" });

  const result = await bookSeat(seatId, userId);
  res.status(result.success ? 200 : 409).json(result);
});

// release lock
app.post("/seats/:id/release", async (req, res) => {
  const seatId = req.params.id;
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "userId required" });

  const result = await releaseSeat(seatId, userId);
  res.status(result.success ? 200 : 409).json(result);
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
