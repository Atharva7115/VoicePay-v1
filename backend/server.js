const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/voice", require("./routes/voice"));
app.use("/speech", require("./routes/speech"));
app.use("/intent", require("./routes/intent"));
app.use("/transaction", require("./routes/transaction"));

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
