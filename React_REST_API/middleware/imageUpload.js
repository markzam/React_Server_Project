// import multer from 'multer';
// import { v1 as uuidv4 } from 'uuid';

// const MIME_TYPE_MAP = {
//     "image/png": "png",
//     "image/jpg": "jpg",
//     "image/jpeg": "jpeg",
// };

// const diskStorageOptions = {

// }
// const multerOptions = {
//     {
//         storage: multer.diskStorage({
//             destination: (req, file, callback) => {
//                 callback(null, `${process.cwd()}/uploads/image`)
//             },
//             filename: (req, file, callback) => {
//                 const fileExtension = MIME_TYPE_MAP[file.mimetype];
//                 callback(null, `${uuid()}.${fileExtension}`);
//             },
//         });
//     }

// }

// const imageUpload = multer(multerOptions);