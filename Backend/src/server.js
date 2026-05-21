import app from "./app.js";
import "./config/db.js";
import express from "express";

const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});