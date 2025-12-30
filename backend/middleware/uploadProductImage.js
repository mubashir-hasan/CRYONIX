import multer from 'multer'
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/products/');
    },
    filename: (req, file, cb)=>{
         cb(null, Date.now() + path.extname(file.originalname))  // Or we can use simply `file.originalname` instead of `path.extname(file.originalname)`
    }
});


const filter = (req, file, cb)=>{

    const filetype = ['image/png', 'image/jpg', 'image/jpeg']

    if (filetype.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("File Type not Allowed"), false)
    }
};

export const uploadImage =  multer({
    storage:storage,
    filetype:filter
})