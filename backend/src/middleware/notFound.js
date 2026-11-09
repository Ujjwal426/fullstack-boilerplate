import HttpException from "../utils/HttpException.js";

// Catches requests that didn't match any route and forwards a 404 to the error handler
export default function notFound(req, res, next) {
  next(new HttpException(404, `Not found - ${req.method} ${req.originalUrl}`));
}
