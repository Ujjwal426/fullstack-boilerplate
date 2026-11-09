import HttpException from "../utils/HttpException.js";

// Converts known library errors into HttpException instances
function normalize(err) {
  if (err instanceof HttpException) return err;

  // Malformed JSON body (express.json)
  if (err.type === "entity.parse.failed") return new HttpException(400, "Invalid JSON body");

  // Mongoose: invalid ObjectId, etc.
  if (err.name === "CastError") return new HttpException(400, `Invalid ${err.path}: ${err.value}`);

  // Mongoose: schema validation failed
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message).join(", ");
    return new HttpException(400, message);
  }

  // MongoDB: duplicate key
  if (err.code === 11000) {
    return new HttpException(409, `Duplicate value: ${JSON.stringify(err.keyValue)}`);
  }

  const httpErr = new HttpException(err.status || err.statusCode || 500, err.message || "Internal server error");
  httpErr.stack = err.stack;
  return httpErr;
}

// Central error handler — must be registered after all routes
// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  const { status, message, stack } = normalize(err);
  const isProd = process.env.NODE_ENV === "production";

  if (status >= 500) console.error(err);

  res.status(status).json({
    message: status >= 500 && isProd ? "Internal server error" : message,
    ...(!isProd && status >= 500 && { stack }),
  });
}
