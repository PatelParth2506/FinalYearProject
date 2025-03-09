import { Router } from 'express'
import { upload } from '../middelwares/multer.js';
import { register,
         login,
         logout,
         refreshTokenGenrate,
         changePassword,
         changeAccountDetails,
         changeProfilePhoto,
         getProfile,
         FollowUser,       
         unfollowUser
 } from '../controllers/RegisterControllers.js';
import { auth } from "../middelwares/auth.js"

const router=Router();

router.route("/register").post(
    upload.fields([
        {
            name:"profilePhoto",
            maxCount:1
        }
    ])
,register)
router.route("/login").post(login)
router.route("/logout").post(auth,logout)
router.route("/genrateToken").post(refreshTokenGenrate)
router.route("/passwordchnge").patch(auth,changePassword)
router.route("/accountdetailchange").patch(auth,changeAccountDetails)
router.route("/profilePhotochange").patch(auth,upload.single("profilePhoto"),changeProfilePhoto)
router.route("/getUserProfile/:username").get(auth,getProfile)

router.route("/follow/:userid").post(auth,FollowUser)
router.route("/unfollow/:userid").post(auth,unfollowUser)

export default router