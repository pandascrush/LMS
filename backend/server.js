import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/db.config.js";
import authRoute from "./routes/auth.routes.js";
import adminRoute from "./routes/admin.routes.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: "true",
  })
);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use('/uploads', express.static('uploads'));
//richtext

let richTextContent = "";

app.post("/save", (req, res) => {
  richTextContent = req.body.content;
  res.send({ message: "Content saved successfully" });
});

app.get("/content", (req, res) => {
  res.send({ content: richTextContent });
});

// Test route
app.get("/test", (req, res) => {
  res.json({ msg: "hello world" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
