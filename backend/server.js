// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load .env vars
dotenv.config();

// Initialize app
const app = express();

// ✅ Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// ✅ CORS
app.use(
  cors({
    origin: [ 'https://ashrafigraphic.com',      // ✅ Your domain
    'http://ashrafigraphic.com',       // ✅ HTTP version
    'https://www.ashrafigraphic.com',  // ✅ WWW version
    'http://www.ashrafigraphic.com',
     'https://ashrafi-graphic.onrender.com'       ],  // ✅ WWW HTTP version
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
// ✅ Routes import
const authRoutes = require("./routes/auth");
const googleAuthRoutes = require("./routes/googleAuth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const reviewRoutes = require("./routes/reviews");
const otpRoutes = require("./routes/otpRoutes");
const contactRoutes = require("./routes/contact");
const paymentRoutes = require("./routes/payment");
const userRoutes = require("./routes/user");



app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);  // Mount Google auth routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);


// Items endpoints (in-memory for demo/testing)
app.post("/api/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    item.name = req.body.name;
    return res.json(item);
  }
  res.status(404).json({ error: "Item not found" });
});

app.delete("/api/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id, 10));
  if (index !== -1) {
    items.splice(index, 1);
    return res.json({ message: "Item deleted" });
  }
  res.status(404).json({ error: "Item not found" });
});



// ✅ Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
