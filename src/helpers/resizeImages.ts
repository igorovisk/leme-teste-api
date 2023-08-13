import path from "path";
import sharp from "sharp";

export const resizeAndSaveImages = async (file: any) => {
   const originalFilePath = path.join("src", "uploads", file.filename);
   const resizedFileName = "resized_" + file.filename;
   const resizedFilePath = path.join("src", "uploads", resizedFileName);

   await sharp(originalFilePath).resize(90, 100).toFile(resizedFilePath);

   return resizedFilePath;
};
