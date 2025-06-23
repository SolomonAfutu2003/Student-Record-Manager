import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) {
      return res.status(429).json({ message: "Too much request" });
    }

    next();
  } catch (error) {
    console.log("Error in rate limit", error);
    next(error);
  }
};

export default rateLimiter;
