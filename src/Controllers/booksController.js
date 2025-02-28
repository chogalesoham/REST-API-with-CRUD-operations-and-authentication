import path from "Node:path";
import { fileURLToPath } from "node:url";

// ---------- Create New Books ---------
const createBook = async (req, res) => {
  console.log(req.files);

  // Fix __dirname in ES module
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const coverImageMimeType = req.files.coverImage[0].mimetype.split("/").at(-1);
  const fileName = req.files.coverImage[0].filename;
  const filePath = path.resolve(__dirname, `../../public/uploads/${fileName}`);

  const uploadResult = await cloudinary.uploader.upload(filePath, {
    filename_override: fileName,
    fileName: "books-cover",
    format: coverImageMimeType,
  });

  console.log(uploadResult, "uploadResult");

  res.json({ message: "New Book Created Succecfully" });
};

export { createBook };
