import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
// export const singleUpload = multer({storage}).single("file");
export const singleUpload = upload.single("file");


