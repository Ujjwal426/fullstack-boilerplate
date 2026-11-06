// Must be the first import so env vars are loaded before other modules read them
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
});
