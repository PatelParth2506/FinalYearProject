import {
    createPost,
    getAllPost,
    getSinglePost,
    deletepost
} from '../controllers/PostControllers.js'
import { auth } from "../middelwares/auth.js"
import { Router } from 'express'
import { upload } from '../middelwares/multer.js';

const router=Router()

router.route("/createPost").post(auth,upload.single("photo"),createPost)
router.route("/getAllPost").get(getAllPost)
router.route("/getSinglepost/:postid").get(getSinglePost)
router.route("/deletePost/:id").delete(deletepost)

export default router