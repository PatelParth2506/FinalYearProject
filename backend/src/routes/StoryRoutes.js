import { Router } from 'express';
import { createStory,
            getFolloingStory,
            deleteStory,
            getViewersofStory
 } from '../controllers/StoryController.js'
import { auth } from "../middelwares/auth.js"
import { upload } from '../middelwares/multer.js';
import { fileuploder } from '../utils/cloudinary.js';

const router=Router()

router.route("/createStory").post(auth,upload.single("photo"),createStory)
router.route("/getFollowingStory").get(auth,getFolloingStory)
router.route("/deleteStory/:storyid").delete(auth,deleteStory)
router.route("/getStoryViewers/:storyid").get(auth,getViewersofStory)

export default router