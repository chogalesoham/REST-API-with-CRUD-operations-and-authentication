import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import { createBook } from "../Controllers/booksController.js";
import multer from "multer";

const booksRoute = express.Router();

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  dest: path.join(__dirname, "../../public/uploads"),
  limits: { fieldSize: 3e7 },
});

booksRoute.post(
  "/",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  createBook
);

export default booksRoute;
