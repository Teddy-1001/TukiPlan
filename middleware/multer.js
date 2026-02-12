import multer from "multer";
import path from "node:path";

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/"); // specify the destination directory for uploaded files
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+ path.extname(file.originalname)); // specify the filename for uploaded files
    }
    });

// Create the multer instance with the defined storage configuration
const upload = multer({storage: storage});

export default upload;