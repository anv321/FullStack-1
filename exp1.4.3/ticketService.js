import redis from "./redisClient.js";

const TOTAL_SEATS = 10;
const SEAT_KEY_PREFIX = "seat:";        // seat:S1, seat:S2, ...
const LOCK_TTL_SECONDS = 30;            // lock expires automatically

function seatKey(seatId) {
  return `${SEAT_KEY_PREFIX}${seatId}`;
}

// Initialize seats only once
export async function initSeats() {
  const exists = await redis.exists(seatKey("S1"));
  if (exists) return; // already initialized

  const pipeline = redis.multi();
  for (let i = 1; i <= TOTAL_SEATS; i++) {
    const id = `S${i}`;
    pipeline.hSet(seatKey(id), {
      id,
      status: "available",  // available | locked | booked
      lockedBy: "",
    });
  }
  await pipeline.exec();
}

// Get current seat map
export async function getSeats() {
  const seats = [];
  for (let i = 1; i <= TOTAL_SEATS; i++) {
    const id = `S${i}`;
    const data = await redis.hGetAll(seatKey(id));
    seats.push(data);
  }
  return seats;
}

// Try to lock a seat for a user
export async function lockSeat(seatId, userId) {
  const key = `lock:${seatId}`;

  // SET key userId NX EX ttl   => only succeed if not already locked
  const acquired = await redis.set(key, userId, {
    NX: true,
    EX: LOCK_TTL_SECONDS,
  });

  if (!acquired) {
    return { success: false, message: "Seat already locked by someone else" };
  }

  await redis.hSet(seatKey(seatId), {
    status: "locked",
    lockedBy: userId,
  });

  return { success: true, message: "Seat locked" };
}

// Confirm booking (only if caller holds lock)
export async function bookSeat(seatId, userId) {
  const lockKey = `lock:${seatId}`;
  const lockOwner = await redis.get(lockKey);

  if (lockOwner !== userId) {
    return { success: false, message: "You do not hold the lock for this seat" };
  }

  await redis.hSet(seatKey(seatId), {
    status: "booked",
    lockedBy: userId,
  });

  // optional: remove lock; seat is permanently booked
  await redis.del(lockKey);

  return { success: true, message: "Seat booked" };
}

// Release lock without booking
export async function releaseSeat(seatId, userId) {
  const lockKey = `lock:${seatId}`;
  const lockOwner = await redis.get(lockKey);

  if (lockOwner !== userId) {
    return { success: false, message: "You do not hold this lock" };
  }

  await redis.hSet(seatKey(seatId), {
    status: "available",
    lockedBy: "",
  });
  await redis.del(lockKey);

  return { success: true, message: "Seat released" };
}
