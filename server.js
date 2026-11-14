require("dotenv").config();
console.log("Server re-initializing with Dynamic AI Fallback Engine 2.1...");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const connectDb = require("./db");
const errorHandler = require("./middlewares/errorMiddleware");
const ApiError = require("./utils/ApiError");

// Connect to Database
connectDb();

// HTTP Server and WebSockets Setup
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Attach socket io to the Express app context so controllers can access it
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 Client connected to WebSocket:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Security Middlewares
app.use(helmet());

// Rate Limiting (limit general API requests to 100 per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again later."
});
app.use("/api", limiter);

// Standard Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files for frontend
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const electionRoutes = require("./routes/electionRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/candidate", candidateRoutes);
// election routes for controlling time-bounds
if(electionRoutes) app.use("/api/v1/election", electionRoutes);

// 404 Route handling
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running dynamically on port ${PORT}`);
});