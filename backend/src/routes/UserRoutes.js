import { Router } from 'express'
import { upload } from '../middelwares/multer.js';
import { register } from '../controllers/RegisterControllers.js';
const router=Router();

router.route("/register").post(
    upload.fields([
        {
            name:"profilePhoto",
            maxCount:1
        }
    ])
,register)


export default router