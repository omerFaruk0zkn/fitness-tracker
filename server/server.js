import "dotenv/config";
import app from "./app.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server çalışıyor → http://localhost:${PORT}`);
});
