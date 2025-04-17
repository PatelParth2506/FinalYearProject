import { Router } from 'express';
import { createStory,
            getFolloingStory,
            deleteStory,
            getViewersofStory,
            getCurrentUserStory
 } from '../controllers/StoryController.js'
import { auth } from "../middelwares/auth.js"
import { upload } from '../middelwares/multer.js';
import { fileuploder } from '../utils/cloudinary.js';

const router=Router()

router.route("/createStory").post(auth,upload.single("photo"),createStory)
router.route("/getFollowingStory").get(auth,getFolloingStory)
router.route("/deleteStory/:storyid").delete(auth,deleteStory)
router.route("/getStoryViewers/:storyid").get(auth,getViewersofStory)
router.route("/getCurrentUserStory").get(auth,getCurrentUserStory)

export default router