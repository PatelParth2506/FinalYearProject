import {
    createPost,
    getAllPost,
    getSinglePost,
    deletepost,
    addcomment,
    deletecomment
} from '../controllers/PostControllers.js'
import { auth } from "../middelwares/auth.js"
import { Router } from 'express'
import { upload } from '../middelwares/multer.js';

const router=Router()

router.route("/createPost").post(auth,upload.single("photo"),createPost)
router.route("/getAllPost").get(getAllPost)
router.route("/getSinglepost/:postid").get(getSinglePost)
router.route("/deletePost/:post_id").delete(auth,deletepost)

router.route("/addcomment/:postid").post(auth,addcomment)
router.route("/deletecomment/:postid/:commentid").delete(auth,deletecomment)

export default router