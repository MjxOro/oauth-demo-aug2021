require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// --- 1 ---
// --- 1 END ---

// --- 2 ---
// --- 2 END ---

// --- 3 ---
// --- 3 END ---

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
