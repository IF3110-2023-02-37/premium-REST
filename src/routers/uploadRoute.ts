const express = require('express');
const router = express.Router();
import multer from "multer";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the upload directory based on the route
    let uploadDir = 'src/public/';

    if (req.url.includes('/audio')) {
      uploadDir += 'audio/';
    } else if (req.url.includes('/cover')) {
      uploadDir += 'image/cover/';
    } else if (req.url.includes('/profile')) {
      uploadDir += 'image/profile/';
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/audio', upload.single('file'), (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  
  // if success return response 200
  return res.status(200).json("Audio file uploaded successfully");
});

router.post('/cover', upload.single('file'), (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  return res.status(200).json("Cover image file uploaded successfully");
});

router.post('/profile', upload.single('file'), (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  return res.status(200).json("Profile image file uploaded successfully");
});


module.exports = router;