import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "D:/shyamGraniteBackend/images/"); 
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); 
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  cb(null, true);  // Accept all file types
};

export const upload = multer({
  storage,
  fileFilter,
});
